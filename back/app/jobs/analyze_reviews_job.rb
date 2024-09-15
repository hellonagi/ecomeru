require 'json'

class AnalyzeReviewsJob
  include Sidekiq::Job
  include Sidekiq::Throttled::Job

  sidekiq_throttle(concurrency: { limit: 1 }, threshold: { limit: 1, period: 1.second })
  sidekiq_options unique: :until_executed

  def perform(review_slug, product_id)
    url = "https://review.rakuten.co.jp/item/1/#{review_slug}/"

    response = Net::HTTP.get(URI(url))
    doc = Nokogiri::HTML(response)

    review_list = doc.xpath('//div[@id="itemReviewList"]/following-sibling::ul')

    reviews = ''
    review_list.css('li').each do |review|
      star = review.css('[class^="text-container"]').text
      title = review.css('[class*="word-break-break-word"]').text
      desc = review.css('[class^="review-body"]').text
      output = "---\n#{star}\n"
      output += "#{title}\n" unless title.empty?
      output += "#{desc}\n"
      reviews << output
    end

    if reviews.blank?
      puts 'Reviewsの中身が空です。'
      return
    end

    template = <<~PROMPT
      各レビューは「---」で区切られ、一行目が評価(5点満点)で、2行目以降がレビュー本文です。レビューをポジティブ、ニュートラル、ネガティブに分類し、それぞれの割合を合計100%にしてください。
      positive + neutral + negative = 100
      また、全体的な要約、ポジティブな意見の要約、ネガティブな意見の要約をそれぞれ400文字以内で書いてください。
      要約には、"ポジティブ"、"ネガティブ"、"意見"、"レビュー"といった表現を含めないでください。直接内容に入ってください。

      アウトプット例:
      {
        "a": [ポジティブな割合],
        "b": [ニュートラルな割合],
        "c": [ネガティブな割合],
        "d": [全体の要約],
        "e": [ポジティブな要約],
        "f": [ネガティブな要約]
      }
      レビュー:
    PROMPT

    prompt = "#{template}\n#{reviews}"

    openai_service = OpenaiService.new
    response = openai_service.generate_response(prompt)

    data = JSON.parse(response)

    analysis = Analysis.new(
      positive: data['a'],
      neutral: data['b'],
      negative: data['c'],
      summary: data['d'],
      sum_positive: data['e'],
      sum_negative: data['f'],
      product_id: product_id
    )

    if analysis.save
      puts 'Analysisにデータが追加されました。'
    else
      puts 'Analysisにデータ保存に失敗しました。'
    end
  end
end

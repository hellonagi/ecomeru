class FetchItemIdJob
  include Sidekiq::Job
  include Sidekiq::Throttled::Job

  sidekiq_throttle(concurrency: { limit: 1 }, threshold: { limit: 1, period: 1.second })

  def perform(url, slug)
    response = Net::HTTP.get(URI(url))

    itemid = extract_itemid(response)
    unless itemid
      puts 'itemIdが取得できませんでした'
      nil
    end

    doc = Nokogiri::HTML(response)

    element = doc.at_css('[data-id]')
    if element
      review_slug = element['data-id']
      if review_slug
        puts review_slug
        FetchRakutenItemJob.perform_async(itemid, review_slug, slug)
      else
        puts 'review_slugが取得できませんでした'
      end
    else
      puts 'data-id属性を持つ要素が見つかりませんでした'
    end
  end

  private

  def extract_itemid(response_body)
    match = response_body.match(/itemid:\['(.*?)'\]/)
    match ? match[1] : nil
  end
end

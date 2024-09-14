class FetchItemIdJob
  include Sidekiq::Job
  include Sidekiq::Throttled::Job

  sidekiq_throttle(concurrency: { limit: 1 }, threshold: { limit: 1, period: 1.second })

  def perform(url, slug)
    response = Net::HTTP.get(URI(url))

    itemid = extract_itemid(response)
    if itemid
      FetchRakutenItemJob.perform_async(itemid, slug)
    else
      puts 'itemid が取得できませんでした'
    end
  end

  private

  def extract_itemid(response_body)
    match = response_body.match(/itemid:\['(.*?)'\]/)
    match ? match[1] : nil
  end
end

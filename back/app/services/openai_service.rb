require 'openai'

class OpenaiService
  def initialize
    @client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
  end

  def generate_response(prompt)
    response = @client.chat(
      parameters: {
        model: 'gpt-4o-mini', # 使用するモデル
        messages: [
          { role: 'system', content: 'あなたはECサイトの商品レビューを分析するプロです' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 3000 # 必要に応じてトークン数を調整
      }
    )
    usage = response['usage']
    puts "合計トークン: #{usage['total_tokens']}"
    response.dig('choices', 0, 'message', 'content')
  end
end

'use server'
import { JSDOM } from 'jsdom'

export async function validateURL(slug: string) {
  const url = `https://item.rakuten.co.jp/${slug.replace('_', '/')}/`
  try {
    // HTTPリクエストを送信してレスポンスを取得
    const response = await fetch(url)
    const responseBody = await response.text()

    // itemidの抽出
    const itemid = extractItemId(responseBody)
    if (!itemid) {
      console.log('itemIdが取得できませんでした')
      return null
    }

    const dom = new JSDOM(responseBody)
    const element = dom.window.document.querySelector('[data-id]')

    if (element) {
      const reviewSlug = element.getAttribute('data-id')
      if (reviewSlug) {
        return { itemid, reviewSlug }
      } else {
        console.log('review_slugが取得できませんでした')
      }
    } else {
      console.log('data-id属性を持つ要素が見つかりませんでした')
    }
  } catch (error) {
    console.error('Error:', error)
  }
  return null
}

function extractItemId(responseBody: string): string | null {
  const match = responseBody.match(/itemid:\['(.*?)'\]/)
  return match ? match[1] : null
}

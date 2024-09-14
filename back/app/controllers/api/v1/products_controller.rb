class Api::V1::ProductsController < ApplicationController
  def show
    product = Product.includes(:shops).find_by(slug: params[:id])
    if product
      analysis = Analysis.find_by(product_id: product.id)
      if analysis
        render json: {
          product: product.as_json(include: %i[shops analysis])
        }
      else
        AnalyzeReviewsJob.perform_async(product.review_slug, product.id)
        render json: {
          product: product.as_json(include: :shops)
        }
      end
    else
      render json: { error: 'Product not found' }, status: :not_found
    end
  end

  def create
    url = user_params[:url]
    slug = user_params[:slug]

    # URLが'item.rakuten.co.jp'かどうかチェック
    unless valid_rakuten_url?(url)
      render json: { error: 'Invalid URL. Only item.rakuten.co.jp is allowed.' }, status: :unprocessable_entity
      return
    end

    # Sidekiqジョブにリクエストをキューに入れる
    FetchItemIdJob.perform_async(url, slug)

    render json: { message: 'Request received. Processing in the background.' }
  end

  private

  def user_params
    params.require(:product).permit(:url, :slug)
  end

  def valid_rakuten_url?(url)
    uri = URI.parse(url)
    uri.host == 'item.rakuten.co.jp'
  rescue URI::InvalidURIError
    false
  end
end

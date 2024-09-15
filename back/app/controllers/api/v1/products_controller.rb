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
    itemid = user_params[:itemid]
    review_slug = user_params[:review_slug]
    slug = user_params[:slug]

    FetchRakutenItemJob.perform_async(itemid, review_slug, slug)

    render json: { message: 'Request received. Processing in the background.' }
  end

  private

  def user_params
    params.require(:product).permit(:itemid, :review_slug, :slug)
  end

  def valid_rakuten_url?(url)
    uri = URI.parse(url)
    uri.host == 'item.rakuten.co.jp'
  rescue URI::InvalidURIError
    false
  end
end

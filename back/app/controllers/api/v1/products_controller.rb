class Api::V1::ProductsController < ApplicationController
  def show
    @product = Product.includes(%i[shops genres]).find_by(slug: params[:id])
    if @product
      @analysis = Analysis.find_by(product_id: @product.id)
      AnalyzeReviewsJob.perform_async(@product.review_slug, @product.id) unless @analysis
      render :show
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

  def recent
    @products = Product.includes(%i[shops analysis])
                       .where(analyses: { id: Analysis.order(updated_at: :desc)
                      .limit(9).pluck(:id) })
    render :recent
  end

  def positive
    @products = Product.joins(:analysis)
                       .includes(%i[shops analysis])
                       .order('analyses.positive DESC')
                       .limit(9)
    render :positive
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

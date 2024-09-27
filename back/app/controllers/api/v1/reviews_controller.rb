class Api::V1::ReviewsController < ApplicationController
  before_action :authenticate_api_v1_user!, only: %i[create update destroy]
  before_action :set_product, only: %i[index create update destroy]
  before_action :set_review, only: %i[update destroy]

  def index
    @reviews = @product.reviews
    render :index, status: :ok
  end

  def create
    @review = @product.reviews.new(review_params)
    @review.user_id = current_api_v1_user.id

    if @review.save
      render :show, status: :created
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def update
    if @review.update(review_params)
      render :show, status: :ok
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @review.destroy
      head :no_content
    else
      render json: { error: 'Unable to delete review' }, status: :unprocessable_entity
    end
  end

  private

  def set_product
    @product = Product.find_by!(slug: params[:product_slug])
  end

  def set_review
    @review = @product.reviews.find_by!(user_id: current_api_v1_user.id)
  end

  def review_params
    params.require(:review).permit(:description, :rating, :bought_date)
  end
end

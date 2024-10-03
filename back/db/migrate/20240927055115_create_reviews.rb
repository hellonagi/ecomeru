class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.string :description, null: false, limit: 400
      t.integer :rating, null: false
      t.datetime :bought_date, null: false

      t.timestamps

      t.index %i[user_id product_id], unique: true
    end
  end
end

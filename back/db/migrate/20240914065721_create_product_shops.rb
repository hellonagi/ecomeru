class CreateProductShops < ActiveRecord::Migration[7.1]
  def change
    create_table :product_shops do |t|
      t.references :product, null: false, foreign_key: true
      t.references :shop, null: false, foreign_key: true

      t.timestamps

      t.index %i[product_id shop_id], unique: true
    end
  end
end

class CreateProductGenres < ActiveRecord::Migration[7.1]
  def change
    create_table :product_genres do |t|
      t.references :product, null: false, foreign_key: true
      t.references :genre, null: false, foreign_key: true
      t.integer :level, null: false

      t.timestamps

      t.index %i[product_id genre_id], unique: true
    end
  end
end

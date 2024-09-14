class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name, null: false, limit: 256
      t.string :slug, null: false, limit: 128
      t.string :code, null: false, limit: 128
      t.string :catchcopy, limit: 256
      t.string :manufacturer, limit: 64
      t.integer :price
      t.string  :image, limit: 256
      t.float :review_average, precision: 2
      t.integer :review_count
      t.string :item_url, limit: 256

      t.timestamps

      t.index :slug, unique: true
    end
  end
end

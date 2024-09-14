class CreateShops < ActiveRecord::Migration[7.1]
  def change
    create_table :shops do |t|
      t.string :name,  null: false, limit: 128
      t.string :code,  null: false, limit: 128
      t.string :url, null: false, limit: 256

      t.timestamps

      t.index :code, unique: true
    end
  end
end

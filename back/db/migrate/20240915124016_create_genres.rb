class CreateGenres < ActiveRecord::Migration[7.1]
  def change
    create_table :genres do |t|
      t.string :name, null: false, limit: 64
      t.integer :code, null: false, index: { unique: true }

      t.timestamps
    end
  end
end

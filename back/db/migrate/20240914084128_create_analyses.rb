class CreateAnalyses < ActiveRecord::Migration[7.1]
  def change
    create_table :analyses do |t|
      t.references :product, null: false, foreign_key: true, index: { unique: true }
      t.float :positive
      t.float :neutral
      t.float :negative
      t.string :summary, null: false, limit: 400
      t.string :sum_positive, null: false, limit: 400
      t.string :sum_negative, null: false, limit: 400

      t.timestamps
    end
  end
end

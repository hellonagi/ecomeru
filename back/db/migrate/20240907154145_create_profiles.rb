class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }
      t.string :bio, limit: 140
      t.string :youtube, limit: 32
      t.string :twitch, limit: 32
      t.string :twitter, limit: 32

      t.timestamps
    end
  end
end

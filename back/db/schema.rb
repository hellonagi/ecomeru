# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_09_27_055115) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "analyses", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.float "positive"
    t.float "neutral"
    t.float "negative"
    t.string "summary", limit: 400, null: false
    t.string "sum_positive", limit: 400, null: false
    t.string "sum_negative", limit: 400, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_analyses_on_product_id", unique: true
  end

  create_table "genres", force: :cascade do |t|
    t.string "name", limit: 64, null: false
    t.integer "code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_genres_on_code", unique: true
  end

  create_table "product_genres", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "genre_id", null: false
    t.integer "level", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["genre_id"], name: "index_product_genres_on_genre_id"
    t.index ["product_id", "genre_id"], name: "index_product_genres_on_product_id_and_genre_id", unique: true
    t.index ["product_id"], name: "index_product_genres_on_product_id"
  end

  create_table "product_shops", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "shop_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id", "shop_id"], name: "index_product_shops_on_product_id_and_shop_id", unique: true
    t.index ["product_id"], name: "index_product_shops_on_product_id"
    t.index ["shop_id"], name: "index_product_shops_on_shop_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name", limit: 256, null: false
    t.string "slug", limit: 128, null: false
    t.string "code", limit: 128, null: false
    t.string "catchcopy", limit: 256
    t.integer "price"
    t.string "image", limit: 256
    t.float "review_average"
    t.integer "review_count"
    t.string "item_url", limit: 256
    t.string "review_slug", limit: 256
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_products_on_slug", unique: true
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "bio", limit: 140
    t.string "youtube", limit: 32
    t.string "twitch", limit: 32
    t.string "twitter", limit: 32
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_profiles_on_user_id", unique: true
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "product_id", null: false
    t.string "description", limit: 1000, null: false
    t.integer "rating", null: false
    t.datetime "bought_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_reviews_on_product_id"
    t.index ["user_id", "product_id"], name: "index_reviews_on_user_id_and_product_id", unique: true
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "shops", force: :cascade do |t|
    t.string "name", limit: 128, null: false
    t.string "code", limit: 128, null: false
    t.string "url", limit: 256, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_shops_on_code", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "username"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.boolean "is_admin", default: false
    t.datetime "username_created_at"
    t.datetime "username_updated_at"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "analyses", "products"
  add_foreign_key "product_genres", "genres"
  add_foreign_key "product_genres", "products"
  add_foreign_key "product_shops", "products"
  add_foreign_key "product_shops", "shops"
  add_foreign_key "profiles", "users"
  add_foreign_key "reviews", "products"
  add_foreign_key "reviews", "users"
end

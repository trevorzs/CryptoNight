# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_06_232640) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "portfolio_histories", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_portfolio_histories_on_user_id", unique: true
  end

  create_table "portfolios", force: :cascade do |t|
    t.integer "portfolio_history_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "account_value"
    t.index ["portfolio_history_id"], name: "index_portfolios_on_portfolio_history_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "name", null: false
    t.string "symbol", null: false
    t.string "details", null: false
    t.integer "change"
    t.integer "tag_id"
    t.index ["tag_id"], name: "index_stocks_on_tag_id", unique: true
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "stock_id", null: false
    t.integer "user_id", null: false
    t.integer "amount", null: false
    t.datetime "created_at", null: false
    t.float "price", null: false
    t.float "user_value"
    t.index ["stock_id"], name: "index_transactions_on_stock_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.float "funds", null: false
  end

  create_table "watchlist_joins", force: :cascade do |t|
    t.integer "watchlist_id", null: false
    t.integer "stock_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["watchlist_id", "stock_id"], name: "index_watchlist_joins_on_watchlist_id_and_stock_id", unique: true
    t.index ["watchlist_id"], name: "index_watchlist_joins_on_watchlist_id"
  end

  create_table "watchlists", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_watchlists_on_user_id", unique: true
  end

end

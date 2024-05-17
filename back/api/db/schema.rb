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

ActiveRecord::Schema[7.1].define(version: 0) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", id: :serial, force: :cascade do |t|
    t.string "artist", limit: 50, null: false
    t.string "namealbum", limit: 50, null: false
    t.string "yearalbum", limit: 255, null: false

    t.unique_constraint ["yearalbum"], name: "albums_yearalbum_key"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email", limit: 255, null: false
    t.string "full_name", limit: 255, null: false
    t.string "username", limit: 50, null: false
    t.string "password", limit: 255, null: false
    t.string "role", limit: 50

    t.unique_constraint ["email"], name: "users_email_key"
    t.unique_constraint ["password"], name: "users_password_key"
    t.unique_constraint ["username"], name: "users_username_key"
  end

end

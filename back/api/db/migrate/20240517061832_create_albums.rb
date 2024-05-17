class CreateAlbums < ActiveRecord::Migration[7.1]
  def change
    create_table :albums do |t|
      t.string :artist
      t.string :name_album
      t.string :year_album

      t.timestamps
    end
  end
end

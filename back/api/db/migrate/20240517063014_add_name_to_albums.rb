class AddNameToAlbums < ActiveRecord::Migration[7.1]
  def change
    add_column :albums, :user_id, :integer
  end
end

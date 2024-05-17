json.extract! album, :id, :artist, :name_album, :year_album, :created_at, :updated_at
json.url album_url(album, format: :json)

class AlbumsController < ApplicationController
  before_action :set_album, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token, only: [:create]

  # GET /albums or /albums.json
  def index
    user_id = params[:user_id]
    @albums = Album.where(user_id: user_id).page(params[:page]).per(params[:limit] || 10)
    render json: {
      albums: @albums.map { |album| album.serializable_hash },
      metadata: {
        page: @albums.current_page,
        limit: @albums.limit_value,
        total_pages: @albums.total_pages,
        total_count: @albums.total_count
      }
    }
  end  

  # GET /albums/1 or /albums/1.json
  def show
  end

  # GET /albums/new
  def new
    @album = Album.new
    render json: @album 
  end

  # GET /albums/1/edit
  def edit
  end

  # POST /albums/create or /albums.json
  def create
    @album = Album.new(album_params)

    respond_to do |format|
      if @album.save
        format.json { render :show, status: :created, location: @album, message: "Album was successfully created." }
      else
        format.json { render json: @album.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /albums/1 or /albums/1.json
  def update
    respond_to do |format|
      if @album.update(album_params)
        format.json { render :show, status: :ok, location: @album, message: "Album was successfully updated." }
      else
        format.json { render json: @album.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /albums/1 or /albums/1.json
  def destroy
    @album.destroy!

    respond_to do |format|
      format.json { head :no_content, message: "Album was successfully destroyed."  }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_album
      @album = Album.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def album_params
      params.require(:album).permit(:name_album, :year_album, :artist)
    end
end

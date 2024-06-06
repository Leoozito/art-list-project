class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]
  skip_before_action :verify_authenticity_token, only: [:login, :create]

  # GET /users or /users.json
  def index
    @users = User.all
    render json: @users 
  end

  # GET /users/1 or /users/1.json
  def show
  end

  def login
    user_params = params.require(:user).permit(:email, :password)
    Rails.logger.info "USUARIO PARAMS: #{user_params}"

    user = User.find_by(email: user_params[:email]).try(:authenticate, user_params[:password])
    
    Rails.logger.info "USUARIO: #{user}"
    
    if user
      token = encode_token({ user_id: user.id })
      session[:user_id] = user.id
      render json: {
        logged_in: true,
        user: user.as_json(only: [:id, :email, :name, :full_name, :username, :role, :created_at, :updated_at]),
        token: token
      }, status: :created
    else
      render json: { status: 401 }, status: :unauthorized
    end
  end
   

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.json { render :show, status: :created, location: @user }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.json { render :show, status: :ok, location: @user }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy!

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      full_name = "#{params[:full_name][:firstName]} #{params[:full_name][:lastName]}"
      params.permit(:email, :username, :password, :role).merge(full_name: full_name)      
    end

    def encode_token(payload)
      JWT.encode(payload, 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.swLG_V3aYLyR4gOhaX8yX5xyD107Swm9thl4vJGBVCw')
    end
end
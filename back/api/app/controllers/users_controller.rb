class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]
  skip_before_action :verify_authenticity_token, only: [:login]

  # GET /users or /users.json
  def index
    @users = User.all
    render json: @users 
  end

  # GET /users/1 or /users/1.json
  def show
  end

  def login
    user = User.find_by(email: params["user"]["email"]).try(:authenticate, params["user"]["password"])
    if user
      token = encode_token({ user_id: user.id })
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user.as_json(only: [:id, :email, :name, :full_name, :username, :role, :created_at, :updated_at]),
        token: token
      }
    else
      render json: { status: 401 }
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
      params.require(:user).permit(:full_name, :email, :username, :password, :role)
    end

    def encode_token(payload)
      JWT.encode(payload, 'HJAas4d56asd45ads465a4s5d6HSG5SATY5uu23')
    end
end
class ApplicationController < ActionController::Base

  def authorized
    user = User.find_by(email: params["user"][:email], password: params["user"][:password])
    if user
      token = generate_token(user)
      render json: { token: token }, status: :ok
    else
      render json: { message: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def generate_token(user)
    JWT.encode({ user_id: user.id }, 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.swLG_V3aYLyR4gOhaX8yX5xyD107Swm9thl4vJGBVCw', 'HS256')
  end
end

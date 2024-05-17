class ApplicationController < ActionController::Base
before_action :authorized

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
    JWT.encode({ user_id: user.id }, 'HJAas4d56asd45ads465a4s5d6HSG5SATY5uu23', 'HS256')
  end
end

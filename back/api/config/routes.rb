Rails.application.routes.draw do
  resources :albums
  resources :users

  get "up" => "rails/health#show", as: :rails_health_check
  get "users", to: "users#index"
  get "users/:id", to: "users#show"

  get "albums", to: "albums#index"
  get "albums/:id", to: "albums#show"

  post '/login', to: 'users#login'
end

Rails.application.routes.draw do
  resources :users
  resources :albums

  get "up" => "rails/health#show", as: :rails_health_check
  get "users", to: "users#index"
  get "users/:id", to: "users#show"

  get "albums", to: "albums#index"
  get "albums/:id", to: "albums#show"
end

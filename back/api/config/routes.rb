Rails.application.routes.draw do
  resources :albums
  resources :users
  resources :artists

  get "up" => "rails/health#show", as: :rails_health_check
  get "users", to: "users#index"
  get "users/:id", to: "users#show"

  get "albums", to: "albums#index"
  get "albums/:id", to: "albums#show"
  post "albums/create", to:"albums#create"

  delete '/delete/:id', to: 'albums#destroy'
  put '/update/:id', to: 'albums#update'

  post '/login', to: 'users#login'
  post '/auth/register', to: 'users#create'

  get "artists", to: "artists#index"

end

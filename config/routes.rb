Rails.application.routes.draw do
  resources :projects
  resources :users
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/users/:id/follow", to: 'users#follow'
  delete "/users/:id/unfollow", to: 'users#unfollow'
  # post "/project-image", to: 'projects#add_image'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", 
    to: "fallback#index", 
    constraints: ->(req) { !req.xhr? && req.format.html? && 
    req.path.exclude?('rails/active_storage')}
end

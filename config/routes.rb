Rails.application.routes.draw do

  namespace :api do
    resources :tweets, only: %i[index]
    get 'search', to: 'tweets#search'
    post 'tweet', to: 'tweets#tweet'
    get 'profile', to: 'tweets#profile'
  end
end

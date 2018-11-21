Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"
  namespace :api, defaults: {format: JSON} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :stocks, only: [:index, :show, :create]
    get 'stocks/search/:query', :to => 'stocks#search'
    resources :watchlists, only: [:show, :update]
    resources :watchlist_joins, only: [:create]
    delete 'watchlist_joins', :to => 'watchlist_joins#destroy'
  end
end

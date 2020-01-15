class Api::TweetsController < ApplicationController

  def index
    render json: TwitterClient.home_timeline
  end

  def search
    tweets = TwitterClient.search(params[:term])
    render json: tweets
  end

  def tweet
    render json: TwitterClient.tweet(params[:tweet])
  end

  def profile
    render json: TwitterClient.user_timeline
  end
end

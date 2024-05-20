class ArtistsController < ApplicationController
    def index
      response = Faraday.get('https://europe-west1-madesimplegroup-151616.cloudfunctions.net/artists-api-controller') do |req|
        req.headers['Authorization'] = 'Basic ZGV2ZWxvcGVyOlpHVjJaV3h2Y0dWeQ=='
        req.headers['Content-Type'] = 'application/json'
      end
  
      render json: response.body
    end
end
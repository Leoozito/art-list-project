require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module Api
  class Application < Rails::Application
    config.load_defaults 7.1

    config.autoload_lib(ignore: %w(assets tasks))
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3001' # Pode ser ajustado para permitir múltiplas origens ou uma lista de origens
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: true
      end
    end
  end
end

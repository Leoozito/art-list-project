require 'swagger_helper'

RSpec.describe 'albums', type: :request do

  # path '/albums' do
  #   get('List all albums') do
  #     tags "Users"
  
  #     response(200, 'successful') do
  #       schema type: :object,
  #             properties: {
  #               albums: [{
  #                 id: { type: :integer },
  #                 artist: { type: :string },
  #                 name_album: { type: :string },
  #                 year_album: { type: :string },
  #                 created_at: { type: :string },
  #                 updated_at: { type: :string },
  #                 user_id: { type: :integer }
  #               }],
  #               metadata: {
  #                 page: { type: :integer },
  #                 limit: { type: :integer },
  #                 total_pages: { type: :integer },
  #                 total_count: { type: :integer }
  #               }
  #             }
  
  #       after do |example|
  #         example.metadata[:response][:content] = {
  #           'application/json' => {
  #             example: JSON.parse(response.body, symbolize_names: true)
  #           }
  #         }
  #       end
  #     end
  #     run_test!  
  #   end
  # end
  

  # path '/album/create' do
  #   post('create album') do
  #     response(200, 'successful') do

  #       after do |example|
  #         example.metadata[:response][:content] = {
  #           'application/json' => {
  #             example: JSON.parse(response.body, symbolize_names: true)
  #           }
  #         }
  #       end
        
  #       run_test!
  #     end
  #   end
  # end

  # path '/albums/new' do

  #   get('new album') do
  #     response(200, 'successful') do

  #       after do |example|
  #         example.metadata[:response][:content] = {
  #           'application/json' => {
  #             example: JSON.parse(response.body, symbolize_names: true)
  #           }
  #         }
  #       end
  #       run_test!
  #     end
  #   end
  # end

  # path '/albums/{id}/edit' do
  #   # You'll want to customize the parameter types...
  #   parameter name: 'id', in: :path, type: :integer, description: 'id'

  #   get('Edit album') do
  #     response(200, 'Retrieve the album edited') do
  #       let(:id) { FactoryBot.create(:album).id }

  #       after do |example|
  #         example.metadata[:response][:content] = {
  #           'application/json' => {
  #             example: JSON.parse(response.body, symbolize_names: true)
  #           }
  #         }
  #       end
  #       run_test!
  #     end
  #   end
  # end

  # path '/albums/{id}' do
  #   # You'll want to customize the parameter types...
  #   parameter name: 'id', in: :path, type: :integer, description: 'Album Id'

  #   get('show album') do
  #     response(200, 'Retrieve the album specific') do
  #       let(:id) { FactoryBot.create(:albums).id }

  #       after do |example|
  #         example.metadata[:response][:content] = {
  #           'application/json' => {
  #             example: JSON.parse(response.body, symbolize_names: true)
  #           }
  #         }
  #       end
  #       run_test!
  #     end
  #   end

  #   patch('update album') do
  #     response(200, 'successful') do
  #       let(:id) { '123' }

  #       after do |example|
  #         example.metadata[:response][:content] = {
  #           'application/json' => {
  #             example: JSON.parse(response.body, symbolize_names: true)
  #           }
  #         }
  #       end
  #       run_test!
  #     end
  #   end

  #   put('update album') do
  #     response(200, 'successful') do
  #       let(:id) { '123' }

  #       after do |example|
  #         example.metadata[:response][:content] = {
  #           'application/json' => {
  #             example: JSON.parse(response.body, symbolize_names: true)
  #           }
  #         }
  #       end
  #       run_test!
  #     end
  #   end

  #   delete('delete album') do
  #     response(200, 'successful') do
  #       let(:id) { '123' }

  #       after do |example|
  #         example.metadata[:response][:content] = {
  #           'application/json' => {
  #             example: JSON.parse(response.body, symbolize_names: true)
  #           }
  #         }
  #       end
  #       run_test!
  #     end
  #   end
  # end

  # path '/albums/create' do

  #   post('create album') do
  #     response(200, 'successful') do

  #       after do |example|
  #         example.metadata[:response][:content] = {
  #           'application/json' => {
  #             example: JSON.parse(response.body, symbolize_names: true)
  #           }
  #         }
  #       end
  #       run_test!
  #     end
  #   end
  # end

  # path '/delete/{id}' do
  #   # You'll want to customize the parameter types...
  #   parameter name: 'id', in: :path, type: :integer, description: 'id'

  #   delete('delete album') do
  #     response(200, 'successful') do
  #       let(:id) { '123' }

  #       after do |example|
  #         example.metadata[:response][:content] = {
  #           'application/json' => {
  #             example: JSON.parse(response.body, symbolize_names: true)
  #           }
  #         }
  #       end
  #       run_test!
  #     end
  #   end
  # end

  path '/update/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'id', in: :path, type: :integer, description: 'id'

    put('update album') do
      response(200, 'successful') do
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end
end

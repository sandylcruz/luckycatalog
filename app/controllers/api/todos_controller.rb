# frozen_string_literal: true

module Api
  # This is the todos controller
  class TodosController < ApplicationController
    before_action :ensure_logged_in

    def create
      @todo = Todo.new(user_id: current_user.id, done: false, title: params[:title])

      if @todo.save
        render :show
      else
        render json: @todo.errors.full_messages, status: 422
      end
    end

    def index
      @todos = current_user.todos

      render :index
    end

    def show
      @todo.find_by(id: params[:id])

      if @todo
        render :show
      else
        render json: ['No todo found']
      end
    end

    def update
      @todo = Todo.find_by(id: params[:id])

      if @todo
        @todo.update_attributes(todo_params)
        render json: ['Successfully updated']
      else
        render json: ['No todo found'], status: :not_found
      end
    end

    def destroy
      @todo = Todo.find_by(id: params[:id])

      if @todo
        @todo.destroy!
        render json: ['Successfully deleted todo']
      else
        render json: ['No todo found'], status: :not_found
      end
    end

    private

    def todos_params
      params.permit(:title, :done, :user_id)
    end
  end
end

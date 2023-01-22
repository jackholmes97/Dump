class ApplicationController < ActionController::API
  include ActionController::Cookies
  #rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_error

  before_action :authorize

  private

  def authorize
    @current_user = User.find_by(id: session[:user_id])

    render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @current_user
  end

  # def render_unprocessable_entity_error(excpt)
  #   render json: {errors: excpt.record.errors.full_messages }, status: :unprocessable_entity
  # end
end

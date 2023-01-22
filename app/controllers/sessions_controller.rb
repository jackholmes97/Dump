class SessionsController < ApplicationController
    skip_before_action :authorize

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: {errors: ["Invalid Username/Pasword"]}, status: :unauthorized
        end
    end

    def destroy
        session.clear
        head :no_content
    end
end

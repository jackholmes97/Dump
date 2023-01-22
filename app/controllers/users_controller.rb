class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]
#  before_action :target_user, only: [:follow, :unfollow]

    def create
        user = User.create!(user_params)
        user.avatar.attach(params[:avatar])
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def index
        render json: User.all 
    end

    def show
        render json: @current_user
    end

    def update
        user = @current_user
        if user
            user.update!(user_params)
            if params[:avatar]
                user.avatar.purge_later
                user.avatar.attach(params[:avatar])
            end
            render json: user, status: :ok
        else
            render json: {errors: 'Could not update Profile'}, status: :not_found
        end
    end 

    def follow
        user = User.find_by(id: params[:id])
        follow = Relationship.create!(follower_id: @current_user.id, followee_id: user.id)
        render json: follow, status: :created
    end

    def unfollow
        user = User.find_by(id: params[:id])
        @current_user.followed_users.where(followee_id: user.id).destroy_all
        head :no_content
    end

    private

    def relationship_params
        params.permit(:follower_id, :followee_id)
    end

    def user_params
        params.permit(:username, :name, :email, :password, :password_confirmation, :avatar, :bio)
    end
end

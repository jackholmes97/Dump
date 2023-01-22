class ProjectsController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]
    def create
        project = Project.create!(project_params)
        add_images(project)
        render json: project, status: :created
    end

    def index
        render json: Project.all
    end

    def update
       project = Project.find_by(id: params[:id])
       if project
        project.update!(project_params)
        add_images(project)
        render json: project, status: :ok 
       else
        render json: {error: "Project Not Found"}, status: :not_found
       end
    end

    def destroy
        project = Project.find_by(id: params[:id])
        if project
            project.destroy
            head :no_content
        else
            render json: {error: "Project Not Found"}, status: :not_found
        end
    end

    private

    def add_images(project)
        project.images.attach(params[:images]) if params[:images]
        # # project = Project.find_by(id: params[:id])
        # project.images.map do |image|
        #     project.images.attach(params[:images])
    end

    def project_params
        params.permit(:title, :description, :user_id, images: [])
    end
end

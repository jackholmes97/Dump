class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :user_id, :image_urls

  def image_urls
    object.images.map do |image|
        image.url if object.images.attached?
    end
end
end

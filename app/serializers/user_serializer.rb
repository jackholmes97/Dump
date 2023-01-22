class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :password_digest, :bio, :avatar_url

  has_many :followers
  has_many :followees
  has_many :projects
  def avatar_url
    object.avatar.url
  end
end

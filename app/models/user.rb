class User < ApplicationRecord
    has_secure_password

    has_many :followed_users,
        foreign_key: :follower_id,
        class_name: 'Relationship',
        dependent: :destroy

    has_many :followees, through: :followed_users, dependent: :destroy

    has_many :following_users,
        foreign_key: :followee_id,
        class_name: 'Relationship',
        dependent: :destroy

    has_many :followers, through: :following_users, dependent: :destroy

    has_many :projects
    has_one_attached :avatar

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
end

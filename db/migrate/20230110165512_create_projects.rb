class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :description
      t.integer :user_id
      t.attachment :images

      t.timestamps
    end
  end
end

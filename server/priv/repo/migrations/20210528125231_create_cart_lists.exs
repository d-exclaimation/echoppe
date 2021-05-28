defmodule Echoppe.Repo.Migrations.CreateCartLists do
  use Ecto.Migration

  def change do
    create table(:cart_lists, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :title, :string
      add :description, :text
      add :due_date, :utc_datetime_usec
      add :user_id, references(:users, on_delete: :delete_all, type: :binary_id)

      timestamps()
    end

    create index(:cart_lists, [:user_id])
  end
end

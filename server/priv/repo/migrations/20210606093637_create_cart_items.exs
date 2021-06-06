defmodule Echoppe.Repo.Migrations.CreateCartItems do
  use Ecto.Migration

  def change do
    create table(:cart_items, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :label, :string
      add :price, :float
      add :list_id, references(:cart_lists, on_delete: :delete_all, type: :binary_id)

      timestamps()
    end

    create index(:cart_items, [:list_id])
  end
end

defmodule Echoppe.Cart.Item do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "cart_items" do
    field :label, :string
    field :price, :float
    belongs_to :cart_list, Echoppe.Cart.List, foreign_key: :list_id

    timestamps()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:label, :price])
    |> validate_required([:label, :price])
  end
end

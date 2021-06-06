defmodule Echoppe.Cart.List do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "cart_lists" do
    field :description, :string
    field :due_date, :utc_datetime_usec
    field :title, :string
    belongs_to :user, Echoppe.User
    has_many :cart_item, Echoppe.Cart.Item

    timestamps()
  end

  @doc false
  def changeset(list, attrs) do
    list
    |> cast(attrs, [:title, :description, :due_date])
    |> validate_required([:title, :description])
  end
end

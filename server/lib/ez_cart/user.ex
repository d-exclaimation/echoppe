defmodule EzCart.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :binary
    field :username, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :username, :email])
    |> put_pass_hash(attrs)
    |> validate_required([:name, :username, :email, :password_hash])
  end

  @doc false
  def put_pass_hash(
        %Ecto.Changeset{} = changeset,
        attrs
      ) do
    IO.puts(attrs["password"])

    changeset
    |> put_change(:password_hash, attrs["password"])
  end

  def put_pass_hash(changeset, _), do: changeset
end

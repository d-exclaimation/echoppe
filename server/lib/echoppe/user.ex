defmodule Echoppe.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users" do
    # TODO: Add Index to email
    field :email, :string
    field :name, :string
    field :password, :binary
    field :password_hash, :binary
    field :username, :string

    timestamps()
  end

  @type t() :: %__MODULE__{}

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :username, :email, :password, :password_hash])
    |> put_pass_hash()
    |> validate_required([:name, :username, :email, :password_hash])
  end

  defp put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    changeset
    |> change(Argon2.add_hash(password))
    |> delete_change(:password)
  end

  defp put_pass_hash(changeset), do: changeset
end

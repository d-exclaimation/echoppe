#
#  cart_mutations.ex
#  echoppe
#
#  Created by d-exclaimation on 11:40.
#

defmodule Echoppe.CartMutations do
  @moduledoc """
  Cart Mutations using Ecto ChangeSet
  """
  alias Echoppe.{Cart, Repo, User}

  @doc """
  Create a new Cart using Ecto assosiations in one pipeline
  """
  @spec create_list(map(), %User{}) :: {:ok, %Cart.List{}} | {:error, Ecto.Changeset.t()}
  def create_list(list_attr, user) do
    user
    |> Ecto.build_assoc(:cart_list)
    |> Cart.List.changeset(list_attr)
    |> Repo.insert()
  end

  @doc """
  Delete a Cart using the struct given
  """
  @spec delete_list(Ecto.UUID.t(), %User{}) :: {:ok, %Cart.List{}} | {:error, Ecto.Changeset.t()}
  def delete_list(uuid, user) do
    res =
      Cart.List
      |> Repo.get(uuid)
      |> verify_user(user)

    case res do
      %Cart.List{} = list -> list |> Repo.delete()
      _ -> {:error, %Ecto.Changeset{data: nil, errors: [{:user_id, "invalid user id"}]}}
    end
  end

  @doc """
  Update a cart informations
  """
  @spec update_list(Ecto.UUID.t(), map(), %User{}) ::
          {:ok, %Cart.List{}} | {:error, Ecto.Changeset.t()}
  def update_list(cart_id, changes, user) do
    res =
      Cart.List
      |> Repo.get(cart_id)
      |> verify_user(user)

    case res do
      %Cart.List{} = list ->
        list
        |> Cart.List.changeset(changes)
        |> Repo.update()

      _ ->
        {:error, %Ecto.Changeset{data: nil, errors: [{:user_id, "invalid user id"}]}}
    end
  end

  @doc """
  Insert a new item into a Cart
  """
  @spec insert_item(%Cart.List{}, map()) :: {:ok, %Cart.Item{}} | {:error, Ecto.Changeset.t()}
  def insert_item(cart, item_attr) do
    cart
    |> Ecto.build_assoc(:cart_item)
    |> Cart.Item.changeset(item_attr)
    |> Repo.insert()
  end

  @doc """
  Delete an item from a cart
  """
  @spec delete_item(Ecto.UUID.t()) :: {:ok, %Cart.Item{}} | {:error, Ecto.Changeset.t()}
  def delete_item(id) do
    Cart.Item
    |> Repo.get(id)
    |> Repo.delete()
  end

  defp verify_user(%Cart.List{user_id: owner} = list, %User{id: id}) when owner == id, do: list
  defp verify_user(_, _), do: nil
end

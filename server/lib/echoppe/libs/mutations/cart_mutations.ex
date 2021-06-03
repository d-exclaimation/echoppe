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
end

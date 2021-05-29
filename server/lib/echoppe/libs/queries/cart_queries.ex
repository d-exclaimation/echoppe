#
#  cart_queries.ex
#  echoppe
#
#  Created by d-exclaimation on 20:42.
#

defmodule Echoppe.CartQueries do
  @moduledoc """

  """
  import Ecto.Query
  alias Echoppe.{Cart, Repo}

  @doc """
  Get all the list
  """
  @spec all_list(Ecto.UUID.t()) :: Ecto.Query.t()
  def all_list(uid) do
    from(
      li in Cart.List,
      where: li.user_id == ^uid
    )
  end

  @doc """
  Get List from UUID
  """
  @spec get_list(Ecto.UUID.t()) :: {:ok, %Cart.List{}} | :error
  def get_list(uuid) do
    Repo.get(Cart.List, uuid)
  end
end

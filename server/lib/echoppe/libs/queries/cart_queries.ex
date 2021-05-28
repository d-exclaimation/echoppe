#
#  cart_queries.ex
#  echoppe
#
#  Created by d-exclaimation on 20:42.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule Echoppe.CartQueries do
  @moduledoc """

  """
  import Ecto.Query
  alias Echoppe.Cart

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
end

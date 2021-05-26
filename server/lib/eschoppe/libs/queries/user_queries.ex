#
#  user_queries.ex
#  eschoppe
#
#  Created by d-exclaimation on 12:46.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule Eschoppe.UserQueries do
  @moduledoc """
    Ecto Query for User
  """
  import Ecto.Query
  alias Eschoppe.User

  @doc """
  Get by email
  """
  @spec email_query(String.t()) :: Ecto.Query.t()
  def email_query(email) do
    from(
      u in User,
      where: u.email == ^email
    )
  end
end

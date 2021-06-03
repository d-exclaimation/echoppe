#
#  user_queries.ex
#  echoppe
#
#  Created by d-exclaimation on 12:46.
#

defmodule Echoppe.UserQueries do
  @moduledoc """
  All composable Ecto queries for User
  """
  import Ecto.Query
  alias Echoppe.User

  @doc """
  Get user by email (email is indexed)
  """
  @spec email_query(String.t()) :: Ecto.Query.t()
  def email_query(email) do
    from(
      u in User,
      where: u.email == ^email
    )
  end
end

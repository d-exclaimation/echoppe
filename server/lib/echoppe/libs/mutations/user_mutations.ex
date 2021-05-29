#
#  user_mutations.ex
#  echoppe
#
#  Created by d-exclaimation on 11:52.
#

defmodule Echoppe.UserMutations do
  @moduledoc """
  User Mutations
  """
  alias Echoppe.{User, Repo}

  @doc """
  """
  @spec create(map()) :: %User{}
  def create(user_attr) do
    %User{}
    |> User.changeset(user_attr)
    |> Repo.insert()
  end
end

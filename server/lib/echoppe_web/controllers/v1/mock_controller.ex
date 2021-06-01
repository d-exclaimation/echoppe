#
#  mock_controller.ex
#  ez_cart
#
#  Created by d-exclaimation on 16:56.
#

defmodule EchoppeWeb.V1.MockController do
  @moduledoc """
    Mocking controller for fake data test
  """
  use EchoppeWeb, :controller

  alias Echoppe.{CartMutations}

  @spec create_mock(Plug.Conn.t(), %{String.t() => [map()]}) :: Plug.Conn.t()
  def create_mock(%Plug.Conn{assigns: %{current_user: user}} = conn, %{"mocks" => mocks}) do
    IO.puts("Result:")

    mocks
    |> Enum.map(fn %{"list" => list} -> list end)
    |> Enum.map(&CartMutations.create_list(&1, user))
    |> Enum.filter(&zip_nil/1)
    |> Enum.map(fn {:ok, res} -> res end)
    |> IO.inspect()

    conn
    |> send_resp(200, "ok")
  end

  defp zip_nil({:ok, _}), do: true

  defp zip_nil({:error, %Ecto.Changeset{errors: errors}}) do
    IO.inspect(errors)
    false
  end
end

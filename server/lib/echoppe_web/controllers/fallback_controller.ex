#
#  fallback_controller.ex
#  echoppe
#
#  Created by d-exclaimation on 12:56.
#

defmodule EchoppeWeb.FallbackController do
  @moduledoc """
  Fallback controller
  """
  use Phoenix.Controller

  @doc """
  Error Page Plug
  """
  @spec call(Plug.Conn.t(), any) :: Plug.Conn.t()
  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(LiveCartWeb.ErrorView)
    |> render(:"404")
  end
end

#
#  auth.ex
#  echoppe
#
#  Created by d-exclaimation on 13:22.
#

defmodule EchoppeWeb.Plug.Auth do
  @moduledoc """
    Custom plugs to auth user otherwise leave
  """
  import Plug.Conn
  import Phoenix.Controller

  @doc """
  Create the plug
  """
  @spec init(any) :: any
  def init(default), do: default

  @doc """
  Validation of user session (Auth), error will send a 401 (previously a redirect)
  """
  @spec call(Plug.Conn.t(), any) :: Plug.Conn.t()
  def call(conn, _) do
    res =
      conn
      |> fetch_session()
      |> get_session(:user_id)

    case res do
      nil ->
        conn
        |> put_status(401)
        |> text("What are you doing here, mate?")
        |> halt()

      user_id ->
        assign(conn, :current_user, Echoppe.Repo.get!(Echoppe.User, user_id))
    end
  end
end

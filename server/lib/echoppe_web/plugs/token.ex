#
#  csrf.ex
#  echoppe
#
#  Created by d-exclaimation on 13:22.
#

defmodule EchoppeWeb.Plug.OneTimeToken do
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
  Get one time token user
  """
  @spec call(Plug.Conn.t(), any) :: Plug.Conn.t()
  def call(%Plug.Conn{method: "GET"} = conn, _), do: conn

  def call(%Plug.Conn{req_headers: headers} = conn, _) do
    res =
      conn
      |> fetch_session()
      |> get_session(:one_time_token)

    res2 =
      headers
      |> Enum.filter(fn {key, _} -> key == "one-time-token" end)

    cond do
      res == nil || res2 == [] ->
        conn
        |> put_status(401)
        |> text("What are you doing here, mate?")
        |> halt()

      true ->
        [{"one-time-token", token}] = res2

        if res == token do
          delete_csrf_token()
          conn |> fetch_session() |> delete_session(:one_time_token)
        else
          conn |> put_status(401) |> text("Cannot validate") |> halt()
        end
    end
  end
end

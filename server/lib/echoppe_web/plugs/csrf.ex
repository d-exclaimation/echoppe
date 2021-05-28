#
#  csrf.ex
#  echoppe
#
#  Created by d-exclaimation on 13:22.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule EchoppeWeb.Plug.Csrf do
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
  Auth user
  """
  @spec call(Plug.Conn.t(), any) :: Plug.Conn.t()
  def call(%Plug.Conn{req_headers: headers} = conn, _) do
    res =
      conn
      |> fetch_session()
      |> get_session(:csrf_token)

    res2 =
      headers
      |> Enum.filter(fn {key, _} -> key == "x-csrf-token" end)

    cond do
      res == nil || res2 == [] ->
        conn
        |> put_status(401)
        |> text("What are you doing here, mate?")
        |> halt()

      true ->
        [{"x-csrf-token", token}] = res2

        case res == token do
          true ->
            delete_csrf_token()
            conn |> fetch_session() |> delete_session(:csrf_token)

          false ->
            conn |> put_status(401) |> text("Cannot validate") |> halt()
        end
    end
  end
end

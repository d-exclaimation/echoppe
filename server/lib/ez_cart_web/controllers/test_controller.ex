#
#  test_controller.ex
#  ez_cart
#
#  Created by d-exclaimation on 19:55.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule EzCartWeb.TestController do
  @moduledoc """
    test Controller for Auth
  """
  use EzCartWeb, :controller

  @spec index(Plug.Conn.t(), any) :: Plug.Conn.t()
  def index(
        %Plug.Conn{
          assigns: %{
            current_user: %EzCart.User{id: id, name: name, username: username, email: email}
          }
        } = conn,
        _
      ) do
    conn
    |> json(%{
      id: id,
      name: name,
      username: username,
      email: email
    })
  end

  def index(conn, _), do: text(conn, "No data")
end

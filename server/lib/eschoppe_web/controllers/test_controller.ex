#
#  test_controller.ex
#  eschoppe
#
#  Created by d-exclaimation on 19:55.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule EschoppeWeb.TestController do
  @moduledoc """
    test Controller for Auth
  """
  use EschoppeWeb, :controller

  @spec index(Plug.Conn.t(), any) :: Plug.Conn.t()
  def index(
        %Plug.Conn{
          assigns: %{
            current_user: %Eschoppe.User{id: id, name: name, username: username, email: email}
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
end

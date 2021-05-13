#
#  user_controller.ex
#  ez_cart
#
#  Created by d-exclaimation on 08:12.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule EzCartWeb.UserController do
  @moduledoc """
    User controller
  """
  use EzCartWeb, :controller
  alias EzCart.{Repo, User}

  @doc """
  Sign up a new account
  """
  @spec sign_up(Plug.Conn.t(), %{String.t() => map()}) :: Plug.Conn.t()
  def sign_up(conn, %{"user" => user_attr}) do
    res =
      %User{}
      |> User.changeset(user_attr)

    IO.inspect(res)

    conn
    |> text("ok")

    # res =
    #   %User{}
    #   |> User.changeset(user_attr)
    #   |> Repo.insert()

    # case res do
    #   {:ok, user} ->
    #     conn
    #     |> render("signup.json", user: user)

    #   {:error, _} ->
    #     conn
    #     |> put_status(409)
    #     |> json(%{})
    # end
  end

  def sign_up(conn, _),
    do: conn |> put_status(400) |> json(%{})
end

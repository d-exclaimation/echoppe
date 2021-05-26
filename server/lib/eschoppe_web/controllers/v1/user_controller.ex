#
#  user_controller.ex
#  eschoppe
#
#  Created by d-exclaimation on 08:12.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule EschoppeWeb.V1.UserController do
  @moduledoc """
    User controller
  """
  use EschoppeWeb, :controller
  alias Eschoppe.{Repo, User}

  @doc """
  Sign up a new account
  """
  @spec sign_up(Plug.Conn.t(), %{String.t() => map()}) :: Plug.Conn.t()
  def sign_up(conn, %{"user" => user_attr}) do
    res =
      %User{}
      |> User.changeset(user_attr)
      |> Repo.insert()

    case res do
      {:ok, user} ->
        conn
        |> fetch_session()
        |> put_session(:user_id, user.id)
        |> configure_session(renew: true)
        |> render("signup.json", user: user)

      {:error, _} ->
        conn
        |> send_resp(409, "")
    end
  end

  def sign_up(conn, _),
    do: conn |> put_status(400) |> json(%{})

  @doc """

  """
  @spec sign_in(Plug.Conn.t(), %{String.t() => map()}) :: Plug.Conn.t()
  def sign_in(conn, %{"login" => %{"email" => email, "password" => password}}) do
    case authenticate(email, password) do
      {:ok, user} ->
        conn
        |> fetch_session()
        |> put_session(:user_id, user.id)
        |> configure_session(renew: true)
        |> render("login.json", user: user)

      {:error, reason} ->
        conn
        |> send_resp(
          if(reason == :unauthorized, do: 401, else: 404),
          "Invalid permission, check your crednentials"
        )
    end
  end

  @spec authenticate(String.t(), String.t()) ::
          {:error, :not_found | :unauthorized} | {:ok, %User{}}
  defp authenticate(email, password) do
    res =
      email
      |> Eschoppe.UserQueries.email_query()
      |> Repo.one()

    case res do
      %User{} = user ->
        case Argon2.check_pass(user, password) do
          {:error, _} -> {:error, :unauthorized}
          good -> good
        end

      nil ->
        {:error, :not_found}
    end
  end
end

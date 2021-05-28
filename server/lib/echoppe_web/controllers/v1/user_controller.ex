#
#  user_controller.ex
#  echoppe
#
#  Created by d-exclaimation on 08:12.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule EchoppeWeb.V1.UserController do
  @moduledoc """
    User controller
  """
  use EchoppeWeb, :controller
  alias Echoppe.{Repo, User}

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
        delete_csrf_token()

        conn
        |> fetch_session()
        |> put_session(:user_id, user.id)
        |> configure_session(renew: true)
        |> render("signup.json", user: user)

      {:error, _} ->
        conn
        |> send_resp(
          409,
          "The data sent does not match user changeset, properties: [:name, :username, :email. :password]"
        )
    end
  end

  def sign_up(conn, _),
    do: conn |> put_status(400) |> json(%{})

  @doc """

  """
  @spec sign_in(Plug.Conn.t(), %{String.t() => map()}) :: Plug.Conn.t()
  def sign_in(conn, %{"login" => %{"email" => email, "password" => password}}) do
    token = get_csrf_token()

    case authenticate(email, password) do
      {:ok, user} ->
        delete_csrf_token()

        conn
        |> fetch_session()
        |> put_session(:user_id, user.id)
        |> configure_session(renew: true)
        |> put_resp_cookie("x-csrf-token", token, http_only: false)
        |> render("login.json", user: user)

      {:error, reason} ->
        conn
        |> send_resp(
          if(reason == :unauthorized, do: 401, else: 404),
          "Invalid permission, check your crednentials"
        )
    end
  end

  @doc """
  Me query to check for logged in client
  """
  @spec me(Plug.Conn.t(), any) :: Plug.Conn.t()
  def me(%Plug.Conn{assigns: %{current_user: user}} = conn, _),
    do: conn |> render("me.json", user: user)

  @doc """
  Prequest before sending
  """
  @spec prequest(PLug.Conn.t(), any) :: Plug.Conn.t()
  def prequest(conn, _) do
    token = get_csrf_token()

    conn
    |> fetch_session()
    |> put_session(:csrf_token, token)
    |> put_resp_cookie("csrf-token", token,
      sign: false,
      http_only: false,
      same_site: "secure"
    )
    |> text("")
  end

  @spec authenticate(String.t(), String.t()) ::
          {:error, :not_found | :unauthorized} | {:ok, %User{}}
  defp authenticate(email, password) do
    res =
      email
      |> Echoppe.UserQueries.email_query()
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

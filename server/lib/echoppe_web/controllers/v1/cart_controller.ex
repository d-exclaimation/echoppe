#
#  cart_controller.ex
#  echoppe
#
#  Created by d-exclaimation on 20:23.
#

defmodule EchoppeWeb.V1.CartController do
  @moduledoc """
    Cart.List and Cart.Item Controller
  """
  use EchoppeWeb, :controller
  alias Echoppe.{Repo, CartQueries, CartMutations, User, Cart}

  action_fallback(EchoppeWeb.FallbackController)

  @doc """
  Get all the Cart.List
  """
  @spec all_list(Plug.Conn.t(), any) :: Plug.Conn.t()
  def all_list(%Plug.Conn{assigns: %{current_user: %User{id: id}}} = conn, _) do
    conn
    |> render("all_list.json", lists: Repo.all(CartQueries.all_list(id)))
  end

  @doc """
  Create a new Cart.List
  """
  @spec create_list(Plug.Conn.t(), %{String.t() => map()}) :: Plug.Conn.t()
  def create_list(%Plug.Conn{assigns: %{current_user: user}} = conn, %{
        "list" => list_attr
      }) do
    case CartMutations.create_list(list_attr, user) do
      {:ok, list} ->
        conn
        |> render("new_list.json", list: list)

      {:error, _} ->
        conn
        |> send_resp(
          409,
          "The data sent does not match Cart.List changeset, properties: [:title, :description]"
        )
    end
  end

  @doc """
  Room view call
  TODO: delete later as I am just gonna use the socket
  """
  @spec room_view(Plug.Conn.t(), %{String.t() => String.t()}) :: Plug.Conn.t()
  def room_view(%Plug.Conn{assigns: %{current_user: _user}} = conn, %{"rid" => rid}) do
    with {:ok, uuid} <- Ecto.UUID.cast(rid),
         %Cart.List{} = list <- CartQueries.get_list(uuid) do
      conn
      |> render("new_list.json", list: list)
    else
      _ ->
        conn |> send_resp(404, "Invalid UUID or Room does not exist")
    end
  end
end

#
#  cart_controller.ex
#  echoppe
#
#  Created by d-exclaimation on 20:23.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule EchoppeWeb.V1.CartController do
  @moduledoc """
    Cart.List and Cart.Item Controller
  """
  use EchoppeWeb, :controller
  alias Echoppe.{Cart.List, Repo, CartQueries, User}
  import MapMerge

  @doc """
  Get all the Cart.List
  """
  @spec all_list(Plug.Conn.t(), any) :: Plug.Conn.t()
  def all_list(%Plug.Conn{assigns: %{current_user: %User{id: id}}} = conn, _) do
    conn
    |> render("all_list.json", lists: Repo.all(CartQueries.all_list(id)))
  end

  @doc """
  """
  @spec create_list(Plug.Conn.t(), %{String.t() => map()}) :: Plug.Conn.t()
  def create_list(%Plug.Conn{assigns: %{current_user: %User{id: id}}} = conn, %{
        "list" => list_attr
      }) do
    res =
      %List{}
      |> List.changeset(list_attr &&& %{"user_id" => id})
      |> Repo.insert()

    case res do
      {:ok, list} ->
        conn
        |> render("new.json", list: list)

      {:error, _} ->
        conn
        |> send_resp(
          409,
          "The data sent does not match Cart.List changeset, properties: [:title, :description]"
        )
    end
  end
end

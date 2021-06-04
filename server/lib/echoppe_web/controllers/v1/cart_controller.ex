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
  alias Echoppe.{Repo, CartQueries, CartMutations, User}

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
        |> render("singular.json", list: list)

      {:error, _} ->
        conn
        |> send_resp(
          409,
          "The data sent does not match Cart.List changeset, properties: [:title, :description]"
        )
    end
  end

  @doc """
  Delete a list given the correct user and permission
  """
  @spec delete_list(Plug.Conn.t(), %{String.t() => String.t()}) :: Plug.Conn.t()
  def delete_list(%Plug.Conn{assigns: %{current_user: user}} = conn, %{"id" => id}) do
    with {:ok, uuid} <- Ecto.UUID.cast(id),
         {:ok, deleted} <- CartMutations.delete_list(uuid, user) do
      conn
      |> render("singular.json", list: deleted)
    else
      :error ->
        conn
        |> send_resp(
          409,
          "Invalid UUId"
        )

      {:error, %Ecto.Changeset{errors: errors}} ->
        conn
        |> send_resp(
          409,
          errors
          |> Enum.map(fn {key, reason} -> "#{key}: #{inspect(reason)}" end)
          |> Enum.join("\n")
        )
    end
  end

  @doc """
  Update a list given the correct user and permission
  """
  @spec update_list(Plug.Conn.t(), %{String.t() => String.t()}) :: Plug.Conn.t()
  def update_list(%Plug.Conn{assigns: %{current_user: user}} = conn, %{"id" => id, "list" => list}) do
    with {:ok, uuid} <- Ecto.UUID.cast(id),
         {:ok, updated} <- CartMutations.update_list(uuid, list, user) do
      conn
      |> render("singular.json", list: updated)
    else
      :error ->
        conn
        |> send_resp(
          409,
          "Invalid UUId"
        )

      {:error, %Ecto.Changeset{errors: errors}} ->
        conn
        |> send_resp(
          409,
          errors
          |> Enum.map(fn {key, reason} -> "#{key}: #{inspect(reason)}" end)
          |> Enum.join("\n")
        )
    end
  end
end

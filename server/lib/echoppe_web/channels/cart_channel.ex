#
#  cart_channel.ex
#  echoppe
#
#  Created by d-exclaimation on 16:29.
#

defmodule EchoppeWeb.CartChannel do
  @moduledoc """
  CartRoom Channels
  """
  use Phoenix.Channel
  alias Echoppe.{CartQueries, CartMutations, Cart, User}
  alias EchoppeWeb.V1.CartView
  alias Phoenix.Socket

  @doc """
  Handle join, error out if user is invalid or unauthorized
  """
  @spec join(String.t(), map(), Socket.t()) :: {:ok, Socket.t()} | {:error, map()}
  def join("cart:" <> cart_id, %{"user" => %{"email" => email, "id" => uid}}, socket) do
    case join_process(cart_id, uid, email) do
      {:ok, list} ->
        {:ok, CartView.render_update(list), socket |> assign(cart: list)}

      error ->
        error
    end
  end

  def join("cart:" <> _id, _message, _socket), do: {:error, %{reason: "Unauthorized"}}

  @doc """
  Handle In Events based on keys
  """
  @spec handle_in(String.t(), map(), Socket.t()) :: {:noreply, Socket.t()}
  def handle_in("insert", %{"item" => item_attr}, %Socket{assigns: %{cart: list}} = socket) do
    with {:ok, item} <- CartMutations.insert_item(list, item_attr) do
      broadcast(socket, "insert", %{
        payload: CartView.render("item.json", %{item: item})
      })

      {:noreply, socket}
    else
      {:error, %Ecto.Changeset{} = changset} ->
        {:reply, {:error, changeerror_payload(changset)}, socket}
    end
  end

  def handle_in("delete", %{"id" => id}, socket) do
    with {:ok, uuid} <- Ecto.UUID.cast(id),
         {:ok, item} <- CartMutations.delete_item(uuid) do
      broadcast(socket, "delete", %{
        payload: CartView.render("item.json", %{item: item})
      })

      {:noreply, socket}
    else
      :error ->
        {:reply, {:error, %{id: "invalid"}}, socket}

      {:error, %Ecto.Changeset{} = changset} ->
        {:reply, {:error, changeerror_payload(changset)}, socket}
    end
  end

  # Monad for join event
  defp join_process(cart_id, uid, email) do
    with {:ok, uuid} <- Ecto.UUID.cast(cart_id),
         {:ok, user_id} <- Ecto.UUID.cast(uid),
         %Cart.List{} = list <- CartQueries.get_list(uuid),
         {:ok, %User{}} <- matching_user(user_id, email, list) do
      {:ok, list}
    else
      _ ->
        {:error, %{reason: "Cannot find List"}}
    end
  end

  # Checking for authorization

  defp matching_user(uid, email, %Cart.List{user: %User{id: owner_id, email: owner_email} = user}) do
    if uid == owner_id and email == owner_email do
      {:ok, user}
    else
      :error
    end
  end

  defp matching_user(_, _, _), do: :error

  defp changeerror_payload(%Ecto.Changeset{errors: errors}) do
    errors
    |> Map.new()
  end
end

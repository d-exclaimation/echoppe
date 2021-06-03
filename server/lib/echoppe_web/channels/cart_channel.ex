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
  alias Echoppe.{CartQueries, Cart, UserQueries, Repo, User}
  alias EchoppeWeb.V1.CartView
  alias Phoenix.Socket

  @doc """
  Handle join, error out if user is invalid or unauthorized
  """
  @spec join(String.t(), map(), Socket.t()) :: {:ok, Socket.t()} | {:error, map()}
  def join("cart:" <> cart_id, %{"user" => %{"email" => email, "id" => uid}}, socket) do
    with {:ok, uuid} <- Ecto.UUID.cast(cart_id),
         {:ok, user_id} <- Ecto.UUID.cast(uid),
         %Cart.List{} = list <- CartQueries.get_list(uuid),
         {:ok, %User{username: name}} <- matching_user(user_id, email, list) do
      {:ok,
       %{
         data: ["server: hello #{name}!!", "server: welcome to #{list.title}"],
         list: CartView.render("list.json", %{list: list})
       }, socket |> assign(cart: list)}
    else
      _ ->
        {:error, %{reason: "Cannot find List"}}
    end
  end

  def join("cart:" <> _id, _message, _socket), do: {:error, %{reason: "Unauthorized"}}

  @doc """
  Handle In Events based on keys
  """
  @spec handle_in(String.t(), map(), Socket.t()) :: {:noreply, Socket.t()}
  def handle_in("data", %{"msg" => msg, "user" => user}, %Socket{assigns: %{cart: cart}} = socket) do
    with {:ok, uid} <- Ecto.UUID.cast(user["id"]),
         true <- check_running(uid, cart) do
      broadcast(socket, "data", %{"msg" => msg, "user" => user})
      {:noreply, socket}
    else
      _ ->
        IO.puts("Intercepted")
        {:noreply, socket}
    end
  end

  # Checking for authorization

  defp check_running(uid, %Cart.List{user_id: owner_id}), do: uid == owner_id

  defp matching_user(uid, email, %Cart.List{user_id: owner_id}) do
    email
    |> UserQueries.email_query()
    |> Repo.one()
    |> do_macth_user(uid, owner_id)
  end

  defp do_macth_user(%User{id: id} = user, uid, owner_id) do
    if id == uid and id == owner_id do
      {:ok, user}
    else
      :error
    end
  end

  defp do_macth_user(_, _, _), do: :error
end

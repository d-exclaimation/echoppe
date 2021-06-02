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
  alias Echoppe.{CartQueries, Cart}
  alias EchoppeWeb.V1.CartView
  alias Phoenix.Socket

  @spec join(String.t(), any, Socket.t()) :: {:ok, Socket.t()} | {:error, map()}
  def join("cart:" <> cart_id, _message, socket) do
    with {:ok, uuid} <- Ecto.UUID.cast(cart_id),
         %Cart.List{} = list <- CartQueries.get_list(uuid) do
      {:ok,
       %{
         data: ["server: hello", "server: welcome to #{list.title}"],
         list: CartView.render("list.json", %{list: list})
       }, socket}
    else
      _ ->
        {:error, %{reason: "Cannot find List"}}
    end
  end

  @doc """
  Handle In Events
  """
  @spec handle_in(String.t(), map(), Socket.t()) :: {:noreply, Socket.t()}
  def handle_in("data", payload, socket) do
    broadcast(socket, "data", payload)
    {:noreply, socket}
  end
end

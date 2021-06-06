#
#  cart_view.ex
#  echoppe
#
#  Created by d-exclaimation on 20:28.
#

defmodule EchoppeWeb.V1.CartView do
  @moduledoc """
    Cart View
  """
  use EchoppeWeb, :view
  alias EchoppeWeb.V1.CartView

  @doc """
  Render Cart.List either one or many
  """
  @spec render(
          String.t(),
          %{lists: [%Echoppe.Cart.List{}]}
          | %{list: %Echoppe.Cart.List{}}
          | %{items: [%Echoppe.Cart.Item{}]}
          | %{item: %Echoppe.Cart.Item{}}
        ) ::
          map()
  def render("all_list.json", %{lists: lists}) do
    %{data: render_many(lists, CartView, "list.json", as: :list)}
  end

  def render("singular.json", %{list: list}) do
    %{data: render_one(list, CartView, "list.json", as: :list)}
  end

  def render("list.json", %{list: list}),
    do: %{
      id: list.id,
      title: list.title,
      description: list.description,
      updated_at: list.updated_at,
      due_date: list.due_date
    }

  def render("items.json", %{items: items}) do
    render_many(items, CartView, "item.json", as: :item)
  end

  def render("item.json", %{item: item}) do
    %{
      id: item.id,
      label: item.label,
      price: item.price
    }
  end

  @doc """
  Render data update for cart.list
  """
  @spec render_update(%Echoppe.Cart.List{}) :: map()
  def render_update(list) do
    %{
      items: render("items.json", %{items: list.cart_item}),
      list: render("list.json", %{list: list})
    }
  end
end

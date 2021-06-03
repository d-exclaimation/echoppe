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
  @spec render(String.t(), %{lists: [%Echoppe.Cart.List{}]} | %{list: %Echoppe.Cart.List{}}) ::
          map()
  def render("all_list.json", %{lists: lists}) do
    %{data: render_many(lists, CartView, "list.json", as: :list)}
  end

  def render("new_list.json", %{list: list}) do
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
end

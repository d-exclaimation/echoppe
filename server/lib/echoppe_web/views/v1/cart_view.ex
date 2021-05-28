#
#  cart_view.ex
#  echoppe
#
#  Created by d-exclaimation on 20:28.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule EchoppeWeb.V1.CartView do
  @moduledoc """
    Cart View
  """
  use EchoppeWeb, :view
  alias EchoppeWeb.V1.CartView

  @doc """
  """
  @spec render(String.t(), map()) :: map()
  def render("all_list.json", %{lists: lists}) do
    %{data: render_many(lists, CartView, "list.json", as: :list)}
  end

  def render("new.json", %{list: list}) do
    %{data: render_one(list, CartView, "list.json", as: :list)}
  end

  def render("list.json", %{list: list}),
    do: %{
      id: list.id,
      title: list.title,
      description: list.description,
      due_date: list.due_date
    }
end

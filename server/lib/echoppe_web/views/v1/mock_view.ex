#
#  mock_view.ex
#  ez_cart
#
#  Created by d-exclaimation on 18:22.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule EchoppeWeb.V1.MockView do
  @moduledoc """
    Echoppe Web View for Mocking
  """
  use EchoppeWeb, :view
  alias EchoppeWeb.V1.MockView

  @doc """
  Render JSON
  """
  def render("static.json", %{data: data, user: user}) do
    %{
      data: render_many(data, MockView, "item.json", as: :item),
      by: %{
        id: user.id,
        username: user.username,
        email: user.email
      }
    }
  end

  def render("item.json", %{item: item}),
    do: %{
      label: item.label,
      price: item.price,
      tag: item.tag,
      due_for: item.due_for
    }
end

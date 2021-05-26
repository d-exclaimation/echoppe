#
#  mock_controller.ex
#  ez_cart
#
#  Created by d-exclaimation on 16:56.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule EschoppeWeb.V1.MockController do
  @moduledoc """
    Mocking controller for fake data test
  """
  use EschoppeWeb, :controller

  @grocery_tag "gr-tag"
  @urgent_tag "ur-tag"

  @mock_data [
    %{
      label: "pasta box",
      price: 120.0,
      tag: [@grocery_tag],
      due_for: DateTime.new!(~D[2016-05-24], ~T[13:26:08.003], "Etc/UTC")
    },
    %{
      label: "another pasta box",
      price: 10.0,
      tag: [@grocery_tag],
      due_for: DateTime.new!(~D[2016-05-24], ~T[13:26:08.003], "Etc/UTC")
    },
    %{
      label: "cereal box",
      price: 15.0,
      tag: [@grocery_tag, @urgent_tag],
      due_for: DateTime.new!(~D[2016-05-24], ~T[13:26:08.003], "Etc/UTC")
    },
    %{label: "spring onions", price: 10.0, tag: [@grocery_tag], due_for: nil},
    %{label: "garlic", price: 5.0, tag: [@grocery_tag], due_for: nil},
    %{label: "olive oil", price: 12.0, tag: [@grocery_tag], due_for: nil},
    %{label: "coca cola", price: 3.0, tag: [@grocery_tag], due_for: nil}
  ]

  @doc """
  """
  @spec send_static_mock_data(Plug.Conn.t(), %{String.t() => any()}) :: Plug.Conn.t()
  def send_static_mock_data(
        %Plug.Conn{
          assigns: %{
            current_user: user
          }
        } = conn,
        params
      ) do
    {limit, ""} = Integer.parse(Map.get(params, "limit", "10"))

    data =
      if(length(@mock_data) > limit, do: Enum.slice(@mock_data, 0..(limit - 1)), else: @mock_data)

    conn
    |> render("static.json", user: user, data: data)
  end

  def send_static_mock_data(conn, _), do: conn |> send_resp(401, "This is going to go well")
end

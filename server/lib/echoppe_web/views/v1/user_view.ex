#
#  user_view.ex
#  echoppe
#
#  Created by d-exclaimation on 08:45.
#

defmodule EchoppeWeb.V1.UserView do
  @moduledoc """
  Render JSON
  """
  use EchoppeWeb, :view
  alias EchoppeWeb.V1.UserView

  @doc """
  """
  @spec render(String.t(), map()) :: map()
  def render("signup.json", %{user: user}) do
    %{user: render_one(user, UserView, "user.json")}
  end

  def render("login.json", %{user: user}) do
    %{user: render_one(user, UserView, "user.json")}
  end

  def render("me.json", %{user: user}) do
    render_one(user, UserView, "user.json")
  end

  def render("user.json", %{
        user: %Echoppe.User{id: id, name: name, username: username, email: email}
      }) do
    %{
      id: id,
      name: name,
      username: username,
      email: email
    }
  end
end

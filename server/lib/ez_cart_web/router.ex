defmodule EzCartWeb.Router do
  use EzCartWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth_check do
    plug EzCartWeb.Plug.Auth
    plug :fetch_session
    plug :protect_from_forgery
  end

  scope "/auth", EzCartWeb do
    pipe_through :api

    scope "/v1-imposter" do
      post "/signup", UserController, :sign_up
      post "/signin", UserController, :sign_in
    end
  end

  scope "/test", EzCartWeb do
    pipe_through [:api, :auth_check]

    get "/", TestController, :index
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).

  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [EzCartWeb.Plug.Auth, :check_if_vincent, :fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: EzCartWeb.Telemetry
    end
  end

  @spec check_if_vincent(Plug.Conn.t(), any) :: Plug.Conn.t()
  defp check_if_vincent(%Plug.Conn{assigns: %{current_user: user}} = conn, _) do
    case user do
      %EzCart.User{name: "vincent", email: "thisoneis4business@gmail.com"} ->
        conn

      _ ->
        conn
        |> redirect(external: "https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        |> halt()
    end
  end

  defp check_if_vincent(conn, _),
    do: conn |> redirect(external: "https://www.youtube.com/watch?v=dQw4w9WgXcQ") |> halt()
end

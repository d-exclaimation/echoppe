defmodule EzCartWeb.Router do
  use EzCartWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", EzCartWeb do
    pipe_through :api
    post "/signup", UserController, :sign_up
    post "/signin", UserController, :sign_in
  end

  scope "/test", EzCartWeb do
    pipe_through [:api, :authenticate_user]

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
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: EzCartWeb.Telemetry
    end
  end

  defp authenticate_user(conn, _) do
    res =
      conn
      |> fetch_session()
      |> get_session(:user_id)

    case res do
      nil ->
        conn
        |> text("No data")

      user_id ->
        assign(conn, :current_user, EzCart.User.get_user_by_id(user_id))
    end
  end
end

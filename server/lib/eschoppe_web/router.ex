defmodule EschoppeWeb.Router do
  use EschoppeWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth_check do
    plug EschoppeWeb.Plug.Auth
    plug :fetch_session
    plug :protect_from_forgery
  end

  scope "/auth", EschoppeWeb do
    pipe_through :api

    scope "/v1-imposter", V1 do
      post "/signup", UserController, :sign_up
      post "/signin", UserController, :sign_in
    end
  end

  scope "/mock", EschoppeWeb do
    pipe_through [:api, :auth_check]

    scope "/v1-imposter", V1 do
      get "/static", MockController, :send_static_mock_data
    end
  end

  scope "/test", EschoppeWeb do
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
      pipe_through [
        :fetch_session,
        :protect_from_forgery
      ]

      live_dashboard "/dashboard", metrics: EschoppeWeb.Telemetry
    end
  end
end

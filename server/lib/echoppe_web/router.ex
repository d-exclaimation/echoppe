defmodule EchoppeWeb.Router do
  use EchoppeWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth_check do
    plug EchoppeWeb.Plug.Auth
    plug :fetch_session
    plug :protect_from_forgery
  end

  scope "/auth", EchoppeWeb do
    pipe_through :api

    scope "/v1-imposter", V1 do
      post "/signup", UserController, :sign_up
      post "/signin", UserController, :sign_in

      scope "/" do
        pipe_through :auth_check
        get "/me", UserController, :me
      end
    end
  end

  scope "/mock", EchoppeWeb do
    pipe_through [:api, :auth_check]

    scope "/v1-imposter", V1 do
      get "/static", MockController, :send_static_mock_data
    end
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

      live_dashboard "/dashboard", metrics: EchoppeWeb.Telemetry
    end
  end
end

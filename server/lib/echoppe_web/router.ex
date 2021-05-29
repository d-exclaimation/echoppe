defmodule EchoppeWeb.Router do
  use EchoppeWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth_check do
    plug EchoppeWeb.Plug.Auth
    plug EchoppeWeb.Plug.OneTimeToken
  end

  scope "/v1-imposter", EchoppeWeb.V1 do
    pipe_through :api

    # Authentication and User Routes
    scope "/auth" do
      post "/signup", UserController, :sign_up
      post "/signin", UserController, :sign_in

      # Token Prequest
      scope "/" do
        pipe_through EchoppeWeb.Plug.Auth
        get "/csrf-prequest", UserController, :prequest
      end

      # Me query
      scope "/" do
        pipe_through :auth_check
        get "/me", UserController, :me
      end
    end

    # Cart Routes
    scope "/cart" do
      pipe_through :auth_check

      get "/all_list", CartController, :all_list
      get "/room/:rid", CartController, :room_view
      post "/new", CartController, :create_list
    end

    scope "/mock" do
      pipe_through :auth_check

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

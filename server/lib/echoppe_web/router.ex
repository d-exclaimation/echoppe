defmodule EchoppeWeb.Router do
  use EchoppeWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Full authentication pipelines from session validation to one time token
  pipeline :auth_check do
    plug EchoppeWeb.Plug.Auth
    plug EchoppeWeb.Plug.OneTimeToken
  end

  scope "/v1-imposter", EchoppeWeb.V1 do
    pipe_through :api

    # Authentication and User Routes, no plugs (atm)
    scope "/auth" do
      post "/signup", UserController, :sign_up
      post "/signin", UserController, :sign_in
      post "/signout", UserController, :sign_out

      # Token Prequest, require Auth Plug
      scope "/" do
        pipe_through EchoppeWeb.Plug.Auth
        get "/csrf-prequest", UserController, :prequest
      end

      # Me query, require full auth pipelines
      scope "/" do
        pipe_through :auth_check
        get "/me", UserController, :me
      end
    end

    # Cart Routes, require full auth pipelines
    scope "/cart" do
      pipe_through :auth_check

      get "/all_list", CartController, :all_list
      post "/new", CartController, :create_list
      delete "/delete/:id", CartController, :delete_list
      put "/update/:id", CartController, :update_list
    end

    if Mix.env() in [:dev, :test] do
      scope "/mock" do
        pipe_through EchoppeWeb.Plug.Auth

        post "/new", MockController, :create_mock
      end
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

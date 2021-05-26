defmodule Echoppe.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Echoppe.Repo,
      # Start the Telemetry supervisor
      EchoppeWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Echoppe.PubSub},
      # Start the Endpoint (http/https)
      EchoppeWeb.Endpoint
      # Start a worker by calling: Echoppe.Worker.start_link(arg)
      # {Echoppe.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Echoppe.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    EchoppeWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end

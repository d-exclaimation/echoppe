defmodule Echoppe.Repo do
  use Ecto.Repo,
    otp_app: :echoppe,
    adapter: Ecto.Adapters.Postgres
end

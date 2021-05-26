defmodule Eschoppe.Repo do
  use Ecto.Repo,
    otp_app: :eschoppe,
    adapter: Ecto.Adapters.Postgres
end

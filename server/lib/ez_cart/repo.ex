defmodule EzCart.Repo do
  use Ecto.Repo,
    otp_app: :ez_cart,
    adapter: Ecto.Adapters.Postgres
end

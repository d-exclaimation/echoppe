#
#  map_merge.ex
#  echoppe
#
#  Created by d-exclaimation on 21:25.
#  Copyright © 2021 d-exclaimation. All rights reserved.
#

defmodule MapMerge do
  @moduledoc """
    Map Merging Utilities
  """

  @doc """
  Merge map
  """
  @spec map() &&& map() :: map()
  def a &&& b do
    Map.merge(a, b)
  end
end

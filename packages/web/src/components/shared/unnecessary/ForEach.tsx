//
//  ForEach.tsx
//  echoppe
//
//  Created by d-exclaimation on 17:59.
//

import React from "react";

interface Identifiable {
  id: string | number;
}

type Props<T extends Identifiable | string | number> = {
  over: T[];
  children: (curr: T) => React.ReactNode;
};

const ForEach = <T extends Identifiable | string | number>({
  over,
  children,
}: Props<T>) => {
  if (over.length <= 0) return null;
  const [first, ...rest] = over;
  return (
    <>
      {children(first)}
      <ForEach over={rest} children={children} />
    </>
  );
};

export default ForEach;

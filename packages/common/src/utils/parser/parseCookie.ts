//
//  parseCookie.ts
//  echoppe
//
//  Created by d-exclaimation on 15:09.
//

/** Get cookie from document and turn into a map */
export function parseCookie() {
  return new Map(
    document.cookie.split(";").map((val) => {
      const [key, token] = val.split("=");
      return [key, token] as [string, string];
    })
  );
}

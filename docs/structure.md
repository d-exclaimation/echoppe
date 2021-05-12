# Project Structure

EasyCart

## Elixir API

REST-ful APIs (Keeping it simple, and I don't see any field that are not necessary here atm. Still open to changes)

WebSocket (for real time feed, idk where this will make sense, probably add an option for public cart as many user can contribute, but I'll figure it out)

### Schema

#### `User`

- id: `uuid`
- name: `string`
- username: `string`
- credentials: `Credentials :has_one`
- carts: `[Cart.List] :has_many`

#### `Credentials`

- id: `uuid`
- email: `string`
- password: `string`
- user_id: `User :foreign_key`

#### `Cart.List`

- id: `uuid`
- title: `string`
- description: `string`
- due_date: `utc_datetime_usec`
- items: `[Cart.Item] :has_many`
- user_id: `User :foreign_key`

```elixir
# Note this might change to a many_to_many relation as I can make it real-time multiplayer (idk why)
```

#### `Cart.Item`

- id: `uuid`
- name: `string`
- category: `string`
- due_date: `utc_datetime_usec`
- price: `float`
- is_done: `boolean`
- list_id: `Cart.List :foreign_key`

### Schema Structure

```elixir
%User{
  id: String.t,
  name: String.t,
  username: String.t,
  credentials: %Credentials{
    id: String.t
    email: String.t,
    password: String.t,
    user_id: String.t
  }
  carts: [%Cart.List{
    id: String.t
    title: String.t,
    description: String.t,
    due_date: Date.t,
    items: [%Cart.Item{
      name: String.t,
      category: String.t,
      due_date: Date.t,
      price: float,
      is_done: boolean,
      list_id: String.t
    }],
    user_id: String.t,
  }]
}
```

### Authentication

Probably sessions, JWT is not necessary and probably even more convoluted

### Authorization

Coupled with Authentication, will not make request as anonymous

### Security

XSS, CSRF, X-Frame might be something I need to look into, especially CSRF but I think I'll manage

### Idea

Each user can create like a cart list (name might change) which contain a specific context and list all things related to that context which is the cart item. This is linked back to each user in a one_to_many fashion giving ability for user to keep making more of this block of context

## React App

Single page application, using some-variation of JAM Stack

Seperate the Client and Server

### "Pages" / Views

`Main`

> Contains all routes <br>
> Act as landing page

`Settings`

> Configure User settings if any

`Login / Logout`

> Configure sessions creation / deteletion and user creation

`Cart Navigation View`

> List all the created Cart.List

`Cart Page`

> List individuals items and the context of the cart

### State management

```ts
type RefetchFunction = () => void;

function useQueryReducer<T>(endpoint: String): [T, RefetchFunction] {
  // ...
  return [state, someFunction];
}
```

Yeah, idk, probably stick to built-in hooks ~~this is where I refer to my state managment logic tree, but it's private lol~~

### Idea

Single page this time, no need for seo (I think unless, this project goes beyong and there is a demand for sharing cart list???)

But I will use client side routing to get off the hastle of going through the app main screen all the time. I need to balance or work with saving data from the server, in a mantainable state, probably local user storage for fast access or maybe not (use cache from the server instead)

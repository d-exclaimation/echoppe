# Project Structure

EasyCart

## Elixir API

REST-ful APIs (Keeping it simple, and I don't see any field that are not necessary here atm. Still open to changes)

WebSocket will be the bread and butter, since most action will done using sockets which is anything with the `Cart.List`

### Schema

#### `User`

- id: `uuid`
- name: `string`
- username: `string`
- email: `string`
- password: `string :will_be_hashed`
- password_hash: `string`
- carts: `[Cart.List] :has_many`

#### `Cart.List`

- id: `uuid`
- title: `string`
- description: `string`
- due_date: `utc_datetime_usec`
- items: `[Cart.Item] :has_many`
- users: `[User] :has_many`

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

Each user can create like a cart list (name might change) which contain a specific context and list all things related to that context which is the cart item. This is linked back to each user in a many_to_many fashion giving ability for user to keep making more of this block of context

Now, I am not sure how to handle the relation in terms of whether I should fetch them immediately or not, maybe I should have it where I don't fetch the users from the cart list until I want to do an update, or should i just name the socket channels as idk the cart list name, and have that to handle different real-time connections and group them together

The many_to_many relation with the User and a Cart.List will allow a real-time updates, and a Cart.List can be managed by each user
This will done through websockets

So Auth, and Getting the listing will be done in REST and once a user select / enter to a Cart List, it will create a websocket connection to handle adding, deleting, and updating. The server will emit the changes to all the user of that Cart.List and handle database updates as well

The user to cart list connection is somewhat shown like: ![`this`](./images/user-to-cartlist.png)

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

The web app will start off using REST to communicate to the server, this will like explained above (see Elixir API's idea). The React App will instansiate a Websocket connection once a user chooses a cart list, the socket handle all the inputs from the user and also perform real-time updates. This allow me not to create sockets immediately, idk if this is a good approach though, maybe it's better to use websocket everywhere or go with GraphQL Subscriptions which will give more flexibilities

The browser to server connection for individual connection will look like:
![`browser-to-server`](./images/individual-connection.png)

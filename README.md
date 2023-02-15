# ToDoList project api

Use `/user/register` to create api key.\
Then pass this key with headers.\
Code sample:

``` 
const key = "8d2f3c1f-0cf3-4b1e-8f59-0c50a45ea145"
const url = 'https://{server_address}/api/todo/'

const headers =   {
    'apiKey': key,
    'Content-Type': 'application/json',
} 

const response = await fetch(url, {method: "GET", headers: headers})
const result = await response.json();
```

## Mongo

Install mongodb. Go to https://www.mongodb.com/docs/manual/installation/ for instructions.\
Create database `todo` (https://www.mongodb.com/basics/create-database), it will be used to store data.\
If you want to use another name edit `./shared/config.js`

## Run

Install dependencies `npm init`\
And start `npm start`
Server will start on `5000` port. Edit `./shared/config.js` to change it.

## API scheme

| Method | Auth | Endpoint       | Description                                                 |
|--------|------|----------------|-------------------------------------------------------------|
| GET    | N    | /user/register | Get new api key. Doesn't require apiKey in headers.         |
| PATCH  | Y    | /user/         | Update user data. `firstName` and `lastName` can be updated |
| DELETE | Y    | /user/         | Delete user data                                            |
| GET    | Y    | /todo/all      | Get array of all todos.                                     |
| GET    | Y    | /todo/{id}     | Get todo details by id.                                     |
| POST   | Y    | /todo/         | Make new todo. Include `text` with todo details             |
| PATCH  | Y    | /todo/{id}     | Update todo by id. `text` and `isDone` can be updated       |
| DELETE | Y    | /todo/{id}     | Delete todo by id.                                          |
| DELETE | Y    | /todo/all      | Delete all todos.                                           |

### Response structure:

`message` - `type: String` server message based on your request.\
`status` - `type: Boolean` was request fulfilled or not.\
`data` - `type: Object` or `type: Array` - object (todo, user) or Array of "todo" objects. Examples below.

```
{
  data: {
    ...
  },
  status: true,
  message: 'Success.'
}
```

### `todo` endpoint response data example:

```
  {
    _id: '63ec331a7875944d8864642e',      
    text: 'Go for a walk',
    isDone: false,
    createdAt: '2023-02-15T01:19:22.362Z',
    updatedAt: '2023-02-15T01:40:20.019Z'
  } 
```

### `user` endpoint response data example:

```  
  {
    _id: '63ecb435c82a8fb6426fc975',
    firstName: 'John',
    lastName: 'Doe',
    apiKey: '89fcac62-0da3-4855-b586-bbcf2a626b60',
    createdAt: '2023-02-15T10:30:13.023Z',
    updatedAt: '2023-02-15T10:30:13.023Z'
  }
```
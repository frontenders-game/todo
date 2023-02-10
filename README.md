# ToDoList api

Use `/user/register` to create api key.

Then pass this key with headers. Code sample

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

# Mongo

`todo` database is used to store data. If you want to use another one edit `./shared/config.js`

## Run

Use `npm start`

## API scheme

| Method | Auth | Endpoint        | Description                                                 |
|--------|------|-----------------|-------------------------------------------------------------|
| GET    |  N   | ./user/register | Get new api key. Doesn't require apiKey in headers.         |
| PATCH  |  Y   | ./user/         | Update your data. `firstName` and `lastName` can be updated |
| DELETE |  Y   | ./user/         | Delete user data                                            |
| GET    |  Y   | ./todo/         | Get array of all todos.                                     |
| GET    |  Y   | ./todo/{id}     | Get todo by id                                              |
| PATCH  |  Y   | ./todo/{id}     | Update todo by id. `text` and `status` can be updated       |
| DELETE |  Y   | ./todo/{id}     | Delete todo by id.                                          |
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return {
    message:
      'Hello, This is the Devshop api, you can check the documentation at https://github.com/mikhael-dantas/devshop_api',
  }
})

Route.post('/login', 'AuthController.login')
Route.delete('/login', 'AuthController.logout').middleware('auth')

Route.get('/users', 'UsersController.index').middleware('auth')
Route.post('/users', 'UsersController.store')
Route.put('/users', 'UsersController.update').middleware('auth')

Route.get('/products', 'ProductsController.index')
Route.post('/products', 'ProductsController.store').middleware('auth')
Route.put('/products/:id', 'ProductsController.update').middleware('auth')
Route.delete('/products/:id', 'ProductsController.delete').middleware('auth')

Route.get('/serviceorders', 'ServiceOrdersController.index').middleware('auth')
Route.post('/serviceorders', 'ServiceOrdersController.store').middleware('auth')

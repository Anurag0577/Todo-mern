# Todo MERN Application

A full-stack Todo application built with MongoDB, Express.js, React, and Node.js.

## Backend Documentation

### Prerequisites

- Node.js
- MongoDB Atlas account
- npm or yarn package manager
- Postman (for API testing)

### Setup

1. Install dependencies:
```bash
cd Backend
npm install
```

2. Start the server:
```bash
node index.js
```

### Testing with Postman

#### Setup
1. Open Postman
2. Create a new collection named "Todo MERN API"
3. Set the base URL: `http://localhost:3000`

#### Authentication Endpoints

1. **Signup**
   - Method: POST
   - URL: `http://localhost:3000/api/signup`
   - Headers: 
     ```
     Content-Type: application/json
     ```
   - Body (raw JSON):
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

2. **Login**
   - Method: POST
   - URL: `http://localhost:3000/api/login`
   - Headers:
     ```
     Content-Type: application/json
     ```
   - Body (raw JSON):
     ```json
     {
       "username": "testuser",
       "password": "password123"
     }
     ```
   - Save the received token for subsequent requests

#### Todo Endpoints

For all todo endpoints, add the following header:
```
Authorization: Bearer <your_jwt_token>
```

1. **Create Todo**
   - Method: POST
   - URL: `http://localhost:3000/todo`
   - Headers:
     ```
     Content-Type: application/json
     Authorization: Bearer <your_jwt_token>
     ```
   - Body (raw JSON):
     ```json
     {
       "title": "Test Todo",
       "description": "This is a test todo",
       "isCompleted": false
     }
     ```

2. **Get All Todos**
   - Method: GET
   - URL: `http://localhost:3000/todos`
   - Headers:
     ```
     Authorization: Bearer <your_jwt_token>
     ```

3. **Update Todo**
   - Method: PUT
   - URL: `http://localhost:3000/todos/:id` (replace :id with actual todo ID)
   - Headers:
     ```
     Content-Type: application/json
     Authorization: Bearer <your_jwt_token>
     ```
   - Body (raw JSON):
     ```json
     {
       "title": "Updated Todo",
       "description": "This is an updated todo",
       "isCompleted": true
     }
     ```

4. **Delete Todo**
   - Method: DELETE
   - URL: `http://localhost:3000/todos/:id` (replace :id with actual todo ID)
   - Headers:
     ```
     Authorization: Bearer <your_jwt_token>
     ```

### API Endpoints

#### Authentication

- **POST /api/signup**
  - Creates a new user account
  - Request body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **POST /api/login**
  - Authenticates user and returns JWT token
  - Request body:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "Login Successful!",
      "token": "jwt_token"
    }
    ```

#### Todo Operations

All todo endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

- **GET /todos**
  - Retrieves all todos for the authenticated user
  - Response: Array of todo objects

- **POST /todo**
  - Creates a new todo
  - Request body:
    ```json
    {
      "title": "string",
      "description": "string",
      "isCompleted": boolean
    }
    ```

- **PUT /todos/:id**
  - Updates an existing todo
  - Request body:
    ```json
    {
      "title": "string",
      "description": "string",
      "isCompleted": boolean
    }
    ```

- **DELETE /todos/:id**
  - Deletes a todo by ID

### Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

### Security

- JWT-based authentication
- Password hashing
- CORS enabled
- Input validation
- User-specific todo access control

### Database Schema

#### User
```javascript
{
  username: String,
  email: String,
  password: String
}
```

#### Todo
```javascript
{
  userId: ObjectId,
  title: String,
  description: String,
  isCompleted: Boolean
}
```

### Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- cors: Cross-origin resource sharing

### Project Structure

```
Backend/
├── index.js          # Main server file
├── Models/
│   ├── User.js      # User model
│   └── Todos.js     # Todo model
```

### Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 



### Testing with Postman

#### Setup
1. Open Postman
2. Create a new collection named "Todo MERN API"
3. Set the base URL: `http://localhost:3000`

#### Authentication Endpoints

1. **Signup**
   - Method: POST
   - URL: `http://localhost:3000/api/signup`
   - Headers: 
     ```
     Content-Type: application/json
     ```
   - Body (raw JSON):
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

2. **Login**
   - Method: POST
   - URL: `http://localhost:3000/api/login`
   - Headers:
     ```
     Content-Type: application/json
     ```
   - Body (raw JSON):
     ```json
     {
       "username": "testuser",
       "password": "password123"
     }
     ```
   - Save the received token for subsequent requests

#### Todo Endpoints

For all todo endpoints, add the following header:
```
Authorization: Bearer <your_jwt_token>
```

1. **Create Todo**
   - Method: POST
   - URL: `http://localhost:3000/todo`
   - Headers:
     ```
     Content-Type: application/json
     Authorization: Bearer <your_jwt_token>
     ```
   - Body (raw JSON):
     ```json
     {
       "title": "Test Todo",
       "description": "This is a test todo",
       "isCompleted": false
     }
     ```

2. **Get All Todos**
   - Method: GET
   - URL: `http://localhost:3000/todos`
   - Headers:
     ```
     Authorization: Bearer <your_jwt_token>
     ```

3. **Update Todo**
   - Method: PUT
   - URL: `http://localhost:3000/todos/:id` (replace :id with actual todo ID)
   - Headers:
     ```
     Content-Type: application/json
     Authorization: Bearer <your_jwt_token>
     ```
   - Body (raw JSON):
     ```json
     {
       "title": "Updated Todo",
       "description": "This is an updated todo",
       "isCompleted": true
     }
     ```

4. **Delete Todo**
   - Method: DELETE
   - URL: `http://localhost:3000/todos/:id` (replace :id with actual todo ID)
   - Headers:
     ```
     Authorization: Bearer <your_jwt_token>
     ```

### API Endpoints


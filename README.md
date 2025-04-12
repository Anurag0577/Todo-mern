# Todo MERN Application

A full-stack Todo application built with MongoDB, Express.js, React, and Node.js.

## Backend Documentation

### Prerequisites

- Node.js
- MongoDB Atlas account
- npm or yarn package manager

### Setup

1. Install dependencies:
```bash
cd Backend
npm install
```

2. Create a `.env` file in the Backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

3. Start the server:
```bash
node index.js
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
- dotenv: Environment variable management

### Project Structure

```
Backend/
├── index.js          # Main server file
├── Models/
│   ├── User.js      # User model
│   └── Todos.js     # Todo model
└── .env             # Environment variables
```

### Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 
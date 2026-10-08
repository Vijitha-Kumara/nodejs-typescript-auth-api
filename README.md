# Node.js TypeScript Auth API

Simple API documentation for testing the login endpoint.

## Start the API

Create a `.env` file with your MongoDB URL, port, and JWT secret.

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/auth-api
```

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

The API will run at:

```text
http://localhost:3000
```

## Create Test User

Create a user before testing login.

```bash
curl -X POST http://localhost:3000/api/userSinUp \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Success response:

```json
{
  "message": "User created successfully",
  "user": {
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

## Login API

Endpoint:

```text
POST /api/login
```

Request body:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Test with curl:

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Success response:

```json
{
  "message": "Login successful",
  "accessToken": "jwt_token_here",
  "user": {
    "id": "user_id_here",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

## Error Responses

Missing email or password:

```json
{
  "message": "Email and password are required"
}
```

Invalid login details:

```json
{
  "message": "Invalid email or password"
}
```

Inactive user:

```json
{
  "message": "User account is inactive"
}
```

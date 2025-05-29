# PropertyListBackend

A backend service for managing property listings, built with Node.js and Express.

## Features

- RESTful API for property CRUD operations
- MongoDB integration for data storage
- User authentication and authorization (JWT-based)
- Redis caching for improved performance
- Search and filter properties
- Favorite properties management for users
- Property recommendations for users
- Error handling and validation

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Redis

### Installation

```bash
git clone https://github.com/yourusername/PropertyListBackend.git
cd PropertyListBackend
npm install
```

### Configuration

Create a `.env` file in the root directory and add your environment variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_connection_string
```

### Running the Server

```bash
node server.js
```

## API Endpoints

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | /properties             | List all properties                |
| POST   | /properties             | Create a new property              |
| GET    | /properties/:id         | Get property by ID                 |
| PUT    | /properties/:id         | Update property by ID              |
| DELETE | /properties/:id         | Delete property by ID              |
| POST   | /auth/register          | Register a new user                |
| POST   | /auth/login             | User login                         |
| POST   | /properties/:id/favorite| Add property to favorites          |
| DELETE | /properties/:id/favorite| Remove property from favorites     |
| GET    | /users/:id/favorites    | List user's favorite properties    |
| GET    | /recommendations        | Get property recommendations       |

## Database Schema

### Users

| Field      | Type     | Description             |
|------------|----------|------------------------|
| _id        | ObjectId | Primary key            |
| name       | String   | User's name            |
| email      | String   | User's email (unique)  |
| password   | String   | Hashed password        |

### Properties

| Field      | Type     | Description             |
|------------|----------|------------------------|
| _id        | ObjectId | Primary key            |
| title      | String   | Property title         |
| description| String   | Property description   |
| price      | Number   | Property price         |
| location   | String   | Property location      |
| owner      | ObjectId | Reference to User      |
| createdAt  | Date     | Creation timestamp     |

### Recommendations

Recommendations are generated based on user preferences and property data.

## License

MIT

## Author

Sunny Sagar


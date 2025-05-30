# PropertyListBackend

A backend service for managing property listings, built with Node.js and Express.

## 🚀 Features

- RESTful API for property CRUD operations
- MongoDB integration for data storage
- User authentication and authorization (JWT-based)
- Redis caching for improved performance
- Search and filter properties
- Favorite properties management for users
- Property recommendations for users
- Error handling and validation

## 🧰 Tech Stack

- **Node.js** & **Express.js** for server and API
- **MongoDB** with **Mongoose** for database and ODM
- **Redis** for caching
- **JWT** for authentication
- **dotenv** for environment variable management
- **bcrypt** for password hashing

## 📁 Folder Structure

```
PropertyListBackend/
├── config/            # Configuration files (DB, Redis)
├── controllers/       # Route controllers
├── middleware/        # Custom middleware (auth, error handling)
├── models/            # Mongoose models (User, Property)
├── routes/            # Express route definitions
├── services/          # Business logic
├── scripts/           # import csv to mongo functions
├── .env               # environment variables for Secret keys
├── server.js          # Entry point
├── package.json
└── README.md
```
## Getting Started

## ⚙️ Prerequisites

- Node.js (v14+)
- MongoDB
- Redis

## 🛠️ Setup Instructions
1. Clone the repo
   ```bash
   git clone https://github.com/sunnysagar/PropertyListBackend.git
   cd PropertyListBackend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
4. Create a `.env` file
   ```.env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret_key
   REDIS_URL=your_redis_connection_string
   
   ```
> **Note:**  
> If you don't have Redis installed locally, you can:
> - [Download and install Redis](https://redis.io/download) on your machine, **or**
> - Use a free Redis cloud service such as [Redis Cloud](https://redis.com/redis-enterprise-cloud/)
> Update your `REDIS_URL` in the `.env` file accordingly.

5. Start Server
   ```bash
   node server.js
   ```
  Your API will be running at
  ```bash
  http://localhost:5000
  ```


## 🔑 API Endpoints

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

## 🗂️ Database Schema

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
| id         | String   | Unique                 |
| title      | String   | Property title         |
| description| String   | Property description   |
| price      | Number   | Property price         |
| city       | String   | Property city          |
| listed by  | String   | Who list that property |
| createdAt  | Date     | Creation timestamp     |

### Favorites

| Field      | Type     | Description                          |
|------------|----------|--------------------------------------|
| _id        | ObjectId | Primary key                          |
| userId     | ObjectId | Reference to User                    |
| propertyId | ObjectId | Reference to Property                |

### Recommendations

| Field        | Type     | Description                          |
|--------------|----------|--------------------------------------|
| _id          | ObjectId | Primary key                          |
| fromUserId   | String   | User ID who made the recommendation  |
| toUserEmail  | String   | Email of the user being recommended  |
| propertyId   | ObjectId | Reference to Property                |


## 🧑‍💻 Author
### Sunny Sagar



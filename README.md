Backend server for user authentication, built with Node.js, Express, MongoDB, and JWT.
It provides API endpoints for user registration and login, securely handling authentication tokens.

Features
User Registration (Sign Up)

User Login (Sign In)

JWT-based Authentication

Protected Routes Support

Error Handling

Environment Variables for configuration

Tech Stack
Node.js

Express.js

MongoDB (via Mongoose)

JWT (JSON Web Tokens)

bcryptjs for password hashing

dotenv for environment configuration

cors and helmet for security and cross-origin handling

Getting Started
Prerequisites
Node.js and npm installed

MongoDB database (local or cloud like MongoDB Atlas)

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/dinemo-lab/NaumBackend.git
cd NaumBackend
Install dependencies:

bash
Copy
Edit
npm install
Set up environment variables:

Create a .env file in the root directory and add the following:

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Run the server:

bash
Copy
Edit
npm start
Server will start on http://localhost:5000.

API Endpoints

Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login existing user
Request and response formats are based on JSON.

Folder Structure
pgsql
Copy
Edit
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── User.js
├── routes/
│   └── auth.js
├── .env
├── server.js
└── package.json
License
This project is licensed under the MIT License.

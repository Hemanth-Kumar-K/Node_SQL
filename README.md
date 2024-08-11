# Node_SQL

This repository contains a Node.js application that interacts with an SQLite database. It demonstrates how to create, read, update, and delete data in an SQLite database using Node.js, Express, and related packages.

## Features

- User Registration with hashed passwords using bcrypt.
- User Login with JWT authentication.
- Basic CRUD operations on the SQLite database.
- Secure password storage and verification.

## Technologies Used

- Node.js
- Express.js
- SQLite3
- bcrypt for password hashing
- jsonwebtoken (JWT) for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hemanth-Kumar-K/Node_SQL.git
   ```

2. Navigate into the project directory:

   ```bash
   cd Node_SQL
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   node app.js
   ```

## API Endpoints

### Register User

- **URL:** `/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "hemanth",
    "name": "Hemanth",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - Success: `"User Created"`
  - Failure: `"User Already Exists"`

### Login User

- **URL:** `/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "hemanth",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - Success: `{ "jwtToken": "your-jwt-token" }`
  - Failure: `"User Does Not Exist"` or `"Invalid Password"`

### Get All Students

- **URL:** `/`
- **Method:** `GET`
- **Response:**
  - A list of all students in the database.

## Database Schema

The application uses an SQLite database named `help.db`. The main tables used are:

### `user`

- `id` - INTEGER PRIMARY KEY AUTOINCREMENT
- `username` - TEXT UNIQUE
- `name` - TEXT
- `password` - TEXT (hashed)

### `student`

- `student_id` - INTEGER PRIMARY KEY
- `student_name` - TEXT
- `college` - TEXT
- `gpa` - REAL

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Steps to Add the README.md to Your Repository

1. **Create the README.md File:**
   - Open your terminal.
   - Navigate to your project directory.
   - Create the file with `touch README.md` or use any text editor.

2. **Edit the README.md File:**
   - Copy the template provided above.
   - Paste it into the `README.md` file.
   - Adjust any details to match your project.

3. **Commit and Push the README.md:**
   ```bash
   git add README.md
   git commit -m "Add README file"
   git push origin main
   ```

This will add a `README.md` file to your repository with detailed information about your Node.js and SQLite project. Let me know if you need any further assistance!

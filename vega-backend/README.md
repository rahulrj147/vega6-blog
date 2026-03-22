# Vega6 — Backend API

The backend for Vega6 is a robust, well-structured Express.js application designed for high-performance and secure data management.

## 📁 Code Structure

The project follows a modular architecture for scalability and clean separation of concerns:

-   **`src/index.js`**: Application entry point – initializes the database connection and starts the server.
-   **`src/app.js`**: Configures Express, global middlewares (CORS, Morgan, JSON parsing), and serves static files.
-   **`src/controller/`**: Handles incoming HTTP requests, extracts parameters, and communicates with services to return standardized `ApiResponse` objects.
-   **`src/models/`**: Defines Mongoose schemas for Users, Blogs, and Comments, including validations and pre-save hooks (e.g., password hashing).
-   **`src/services/`**: Contains core business logic.
    -   `CommonService.js`: A generic base class providing optimized CRUD, pagination, and sorting for all models.
    -   `UserService.js`: Extends CommonService with specialized auth logic (registration, login, JWT refresh).
-   **`src/routes/`**: Maps API endpoints to their respective controller methods using expressive `router.route()` chaining.
-   **`src/middleware/`**:
    -   `auth.middleware.js`: Protects private routes using JWT verification.
    -   `upload.middleware.js`: Manages local file storage using Multer.
    -   `error.middleware.js`: Global error handler for consistent error reporting.
-   **`src/utils/`**: Reusable helper classes like `ApiResponse`, `ApiError`, and `asyncHandler` wrapper.
-   **`public/uploads/`**: Local filesystem storage for all uploaded media assets.

## 🛠️ Architecture Highlights

-   **Controller-Service Layer**: Decouples the API interface from the database layer for easier testing and maintenance.
-   **CommonService Pattern**: Ensures all models benefit from standard features like server-side pagination and consistent sorting without code duplication.

## 🏁 Scripts

-   `npm start`: Runs the server (Default port: 5010).
-   `npm run dev`: Development mode with nodemon.

## 🔑 .env Requirements

Create a `.env` in the `vega-backend/` root:
-   `PORT`: `5010`
-   `MONGODB_URI`: Your MongoDB connection string.
-   `JWT_SECRET`: Secret key for JWT.

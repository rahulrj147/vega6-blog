# Vega6 — Modern Frontend

The frontend for Vega6 is a premium, performance-optimized Next.js web application built with **Tailwind CSS** and **Lucide** icons. 

## 📁 Code Structure

The project follows the standard Next.js App Router pattern for modern web development:

-   **`src/app/`**: Contains the main application routing logic.
    -   `layout.jsx`: Defines the shared root layout (Header, AuthProvider).
    -   `page.jsx`: The platform homepage featuring latest blogs and explore sections.
    -   `[blog]/[id]/page.jsx`: Individual blog pages with full reading and discussion features.
    -   `dashboard/`: Specialized section for logged-in creators to manage their content.
    -   `login/` / `register/`: Authentication pages with form validation and feedback.
-   **`src/components/`**: Organized into reusable folders:
    -   `ui/`: Base components like `Button`, `Input`, `FileInput`, and `Pagination` designed for consistent aesthetics.
    -   `Navbar.jsx` / `Sidebar.jsx`: Global navigation components with integrated user state.
    -   `CommentSection.jsx`: A feature-rich component for nested replies and comment pagination.
    -   `BlogModal.jsx`: Reusable form modal for both creating and editing blogs.
-   **`src/context/`**:
    -   `AuthContext.jsx`: Provides global access to the authenticated user's profile and core auth methods.
-   **`src/services/`**: Lightweight API communication layer:
    -   `auth.service.js`: Manages login, registration, and logout operations.
    -   `blog.service.js`: Handles fetching, creating, updating, and deleting blog content.
-   **`src/lib/`**:
    -   `axios.js`: Centralized Axios instance with automatic JWT interceptors for silent token refresh.
    -   `utils.js`: Core helpers like `getImageUrl` for resolving local file paths from the backend.
-   **`src/hooks/`**: Custom React hooks for specialized form handling or state management.

## 🚀 Key Features

-   **Next.js 14+**: Leveraging the latest App Router for dynamic routing and optimal SEO.
-   **Responsive Dashboard**: Multi-device support for managing posts and comments.
-   **Aesthetic File Previews**: Interactive image selection and deletion previews.
-   **Secure JWT Flow**: Seamless authentication with automated token refreshing.

## 🌟 Featured: Advanced Pagination System

Vega6 implements a high-performance **Advanced Pagination System** that ensures scalability even with thousands of entries:

-   **Reusable Pagination UI**: A modular `Pagination` component that maintains visual consistency across the entire platform.
-   **Server-Side Driven**: All data fetching is handled on the server via query parameters (`?page=1&limit=5`), reducing client-side memory load.
-   **Multi-Level Implementation**: 
    -   **Blog Feed**: Paginated explore page for browsing latest content.
    -   **Creator Dashboard**: Efficiently manage large numbers of personal blogs.
    -   **Discussion Threads**: Main comment sections are paginated for long-form debates.
    -   **Nested Replies**: Independent pagination for replies, preventing thread-heavy performance bottlenecks.


## 🏁 Scripts

-   `npm run dev`: local development server (Runs on http://localhost:3000).
-   `npm run build`: Optmized production-ready bundle.
-   `npm start`: Start the production server after building.

## 🔑 .env Requirements

Create a `.env.local` in the `vega-frontend/` root:
-   `NEXT_PUBLIC_API_URL`: The backend server address (`http://localhost:5010/api/v1`).

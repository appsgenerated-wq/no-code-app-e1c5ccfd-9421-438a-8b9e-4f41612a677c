# NiceNotes - A Manifest-Powered React App

This is a simple and elegant note-taking application built entirely with React and a Manifest backend. It demonstrates a complete full-stack application architecture using only the Manifest SDK for all backend interactions, including authentication, data management, and access control.

## Features

- **User Authentication**: Secure user sign-up and login, powered by Manifest's `authenticable` feature.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Ownership Policies**: Users can only edit or delete their own notes, enforced by `condition: self` in the Manifest policies.
- **Automatic Admin Panel**: A fully-featured admin dashboard is available at `/admin` to manage all users and notes.
- **Health Check**: A simple UI indicator shows the connection status to the backend.
- **Modern UI**: A clean, responsive user interface built with React and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v16+)
- A running Manifest backend instance.

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Create a `.env` file in the root of the project and add your Manifest backend URL and App ID:
    ```
    VITE_BACKEND_URL=https://your-manifest-backend-url.com
    VITE_APP_ID=your-app-id
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

### Default Credentials

- **Admin User**: `admin@manifest.build` / `admin`
- The Admin Panel provides an interface to create additional users.

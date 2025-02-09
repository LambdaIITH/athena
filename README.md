# Athena Admin Console

Athena is an open-source admin console template built with React, Shadcn, Zustand, Zod, and Go.

## Features

- **React**: A JavaScript library for building user interfaces.
- **Shadcn**: A modern CSS framework.
- **Zustand**: A small, fast, and scalable state management solution.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Go**: A statically typed, compiled programming language designed for simplicity and efficiency.

## Getting Started

To get started with Athena, follow these steps:

**Clone the repository**:
    ```sh
    git clone https://github.com/LambdaIITH/athena.git
    cd athena
    ```

## Frontend Setup

To set up the frontend for Athena, follow these steps:

1. **Navigate to the frontend directory**:
    ```sh
    cd frontend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Run the development server**:
    ```sh
    npm start
    ```

4. **Build the project**:
    ```sh
    npm run build
    ```

## Backend Setup

To set up the backend for Athena, follow these steps:

1. **Navigate to the backend directory**:
    ```sh
    cd backend
    ```

2. **Install Go dependencies**:
    ```sh
    go mod tidy
    ```

3. **Run the backend server**:
    ```sh
    go run main.go
    ```

4. **Build the backend**:
    ```sh
    go build -o athena-backend
    ```

5. **Run the built backend**:
    ```sh
    ./athena-backend
    ```

**Run the backend server with Air for live reloading**:
    ```sh
    air
    ```

Air is a live reloading tool for Go applications. It watches for changes in your source code and automatically restarts the server. To install Air, run:
    ```sh
    go install github.com/cosmtrek/air@latest
    ```

Make sure to add `$GOPATH/bin` to your PATH to use the `air` command.

Make sure you have Go installed on your machine. You can download it from the [official Go website](https://golang.org/dl/).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or suggestions, feel free to open an issue or contact us at [opensource@iith.dev].

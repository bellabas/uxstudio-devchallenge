# UXStudio Developer Challenge

## Dependencies
- **Java**: 21
- **Node.js**: v20.17.0

## Backend
The backend is built using **Spring Boot** with **Kotlin** and **Gradle**. An in-memory database with seed data is used for easy testing. Profile pictures are stored in base64 format due to the project's scope, instead of using a file system.

## Testing
A `start-app.bat` script is provided for Windows users.

## Commands for running the project
1. In the backend directory:
    ```sh
    ./gradlew bootRun
    ```

2. In the frontend directory:
    ```sh
    npm install
    npm run dev
    ```

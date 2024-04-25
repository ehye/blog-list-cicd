# blog-list-cicd

[![Health Check](https://github.com/ehye/blog-list-cicd/actions/workflows/healthCheck.yml/badge.svg)](https://github.com/ehye/blog-list-cicd/actions/workflows/healthCheck.yml)
[![Deployment Pipeline](https://github.com/ehye/blog-list-cicd/actions/workflows/pipeline.yml/badge.svg)](https://github.com/ehye/blog-list-cicd/actions/workflows/pipeline.yml)

## What is this ?

Build a CI/CD-pipeline for Fullstack Open Part 11.20

## How

- To install dependencies:

    ```
    pnpm install
    ```

- To run in debug:

    Use environment variables `MONGODB_URI` and `TEST_MONGODB_URI` to provide db connection strings
    
    Create an `.env` file at root directory and provide db connection strings:
    ```
    MONGODB_URI=<db_connection_string>
    TEST_MONGODB_URI=<test_db_connection_string>
    ```
    Run in client in development mode:
    ```
    pnpm run client:dev
    ```
    Run in server in development mode:
    ```
    pnpm run server:dev
    ```

- To run in production:

    ```bash
    pnpm run deploy
    ```

    Frontend will be build in `./client/dist`

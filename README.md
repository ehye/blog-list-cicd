# blog-list-cicd

[![Health Check](https://github.com/ehye/blog-list-cicd/actions/workflows/healthCheck.yml/badge.svg)](https://github.com/ehye/blog-list-cicd/actions/workflows/healthCheck.yml)
[![Deployment Pipeline](https://github.com/ehye/blog-list-cicd/actions/workflows/pipeline.yml/badge.svg)](https://github.com/ehye/blog-list-cicd/actions/workflows/pipeline.yml)

![React](https://img.shields.io/badge/React-20232A?logo=react)
![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?logo=chakraui&logoColor=white)
![Vite](https://img.shields.io/badge/vite-646CFF.svg?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-%236E9F18?logo=vitest&logoColor=%236E9F18&color=white)
![Express.js](https://img.shields.io/badge/Express.js-ffffff?logo=express&logoColor=259dff)
![Nodemon](https://img.shields.io/badge/Nodemon-%23323330.svg?logo=nodemon&logoColor=%BBDEAD)
![Mongoose](https://img.shields.io/badge/Mongoose-ffffff?logo=mongoose&logoColor=880000)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)

## What

Build a CI/CD-pipeline for Fullstack Open Part 11.20

## How

- To install dependencies:

    ```
    pnpm install
    ```

- To run in debug:

    Use environment variables `MONGODB_URI` and `TEST_MONGODB_URI` to provide db connection strings

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

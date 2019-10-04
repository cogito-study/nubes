# Cogito backend

## How to use

### 1. Download & install dependencies

Clone the repository:

```sh
git clone git@gitlab.com:cogito-dev/backend.git
```

To run the backend, you need the [Prisma 2 CLI](https://github.com/prisma/prisma2/blob/master/docs/prisma-2-cli.md):

```sh
npm install -g prisma2
```

Install Node dependencies:

```sh
cd backend
yarn install
```

### 2. Set up database

Run the following command to set up a PostgreSQL docker container:

```sh
docker run -d --name cogito_postgresql -e POSTGRES_PASSWORD=password -e POSTGRES_USER=username -v my_dbdata:/var/lib/postgresql/data -p 54320:5432 postgres:11
```

Create a `.env` file based on `.env.example` and change the postgreSQL connection URL.

```sh
cp .env.example .env
```

To set up your database, run:

```sh
prisma2 lift up
```

### 3. Generate Photon (type-safe database client)

Run the following command to generate [Photon JS](https://photonjs.prisma.io/):

```sh
prisma2 generate
```

Now you can seed your database using the `seed` script from `package.json`:

```sh
yarn run seed
```

### 4. Build

Build the project with this command:

```sh
yarn run build
```

### 5. Start the GraphQL server

Launch your GraphQL server with this command:

```sh
yarn run start
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

### 6. Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./src/schema.graphql`](./src/schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

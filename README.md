# Getting started

Before you begin , ensure you have met the following requirements:

- [Nodejs](https://nodejs.org/en) and [NPM](https://www.npmjs.com)

## Installation

1. Clone the repository

```bash
  git clone https://github.com/vit1204/BE-CNPM.git
```

2.  Install backend dependencies:

```bash
   npm install
```

3.  Copy the .env.example file:

```bash
 cp .env.example .env
```

4.  Create mysql database in your computer that the database name match with the variable DB_Name in .env file and change the DB_Password variable to match the password when you install mysql
5.  Migrate the database

```bash
npx knex migrate:latest
```

6.  Run the backend server:

```bash
npm start
```

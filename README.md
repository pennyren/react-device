# reactEMS

build this project with below tech.

`react`、`redux`、`postcss`.

now we use `express` in server side, and use `node-postgres` to connect PostgresSQL.

## Install

```
npm install
```

in order to make everything automated. It means the browser will auto refresh when client or server folder changed.

Sounds amazing! So first you need to install `supervisor` in global.

```
npm install supervisor -g
```

## Run

start server in development environment. 

```
npm start
```

in production environment we should use:

```
npm run start:prod
```

have fun :)

# reactEMS

build this project with below tech.

`react`、`redux`、`postcss`.

## Install

```
npm install
```

## Run

```
npm start
```

## Dev Environment
1.  [Materia](https://getmateria.com/),we use matria as server for now.
2.  [Postgresql](https://www.postgresql.org/download/),create the db and user role
```
CREATE USER ems_user PASSWORD 'welcome';
CREATE DATABASE ems_db owner ems_user ENCODING = 'UTF-8';
```
3.  Add the project to Materia, then connect db.
4.  Run the webpack things && edit code in Materia whitch also supports hot reload
```
npm run watch 
```

^_^


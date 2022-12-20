# Next.js TaskFlow App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d significa **detached**

* MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

## Llenar la DB con información de pruebas

Llamar a

```
localhost:3000/api/seed
```

# Back-End

# Listado de Endpoints

### Users
- POST /api/users/login
-  body parameters: "email", "password"
- POST /api/users/register
-  body parameters: "username", "email", "password"

## Los siguientes endpoints requieren token de autorización
### Pets
- GET /api/pets
- GET /api/pets/:id
- DELETE /api/pets/:id

- POST /api/pets/
- UPDATE /api/pets/:id
-  Body example: 
-  >{
    >"name": "NombreMejor",
    >"species": "Dog",
    >"race": "Especia",
    >"birthDate": "11/11/2011",
    >"gender": "Male"
   >}



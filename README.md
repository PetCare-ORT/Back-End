# Back-End

# Listado de Endpoints

### Users
- POST /api/users/login
 - Body example:
 ```
 {
    "email":"el@santo.com",
    "password": "santo"
}
 ```
- POST /api/users/register
 - Body example:
 ```
{
    "username": "ElSanto",
    "email":"el@santo.com",
    "password": "santo"
}
 ```
## Los siguientes endpoints requieren token de autorización
### Pets
- GET /api/pets
- GET /api/pets/:id
- DELETE /api/pets/:id

- POST /api/pets/
- UPDATE /api/pets/:id
 -  Body example (POST, UPDATE): 
 ```
  {
    "name": "Nombre",
    "species": "Dog",
    "race": "Especie",
    "birthDate": "11/11/2020",
    "gender": "Male"
   }
```
### Calendar Entries
- GET /api/calendarEntries
- GET /api/calendarEntries/:id
- DELETE /api/calendarEntries/:id

- POST /api/calendarEntries/
- UPDATE /api/calendarEntries/:id
 -  Body example (POST, UPDATE): 
 ```
{
    "name": "Visita 1",
    "description":"Visita con el veterinario",
    "date":"2021/11/24"
}
```
### Reminders
- GET /api/reminders
- GET /api/reminders/:id
- DELETE /api/reminders/:id

- POST /api/reminders/
- UPDATE /api/reminders/:id
 -  Body example (POST, UPDATE): 
 ```
{
    "name": "Dar de comer",
    "alarmDate": "22:54:00"
}
```
### Diary Entries
- GET /api/diaryEntries
- GET /api/diaryEntries/:id
- DELETE /api/diaryEntries/:id

- POST /api/diaryEntries/
- UPDATE /api/diaryEntries/:id
 -  Body example (POST, UPDATE): 
 ```
{
    "title": "Firulais aprendio a comer",
    "description": "Firulais ahora ladra al verme",
    "date": "02/11/2021",
    "attatchment": ""
}
```

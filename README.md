# Back-End

# Host

https://pet-care-tp2bec.herokuapp.com

# Listado de Endpoints

### Users

#### Register

Allows a User to sign up.

- POST /api/users/register
 - Body example:
 ```
{
    "username": "ElSanto",
    "email":"el@santo.com",
    "password": "santo"
}
 ```

### Login

Allows a User to log in.

- POST /api/users/login
 - Body example:
 ```
 {
    "email":"el@santo.com",
    "password": "santo"
}
 ```

## Following endpoints require an authentication Token.


### Pets

Allows the view, addition, elimination and update of an user pets.

#### View
- GET /api/pets
- GET /api/pets/:id

#### Elimination
- DELETE /api/pets/:id

#### Addition
- POST /api/pets/

#### Update
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
Allows the view, addition, elimination and update of an user calendar entry, for example, an appointment.

#### View
- GET /api/calendarEntries
- GET /api/calendarEntries/:id

#### Elimination
- DELETE /api/calendarEntries/:id

#### Addition
- POST /api/calendarEntries/

#### Update
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

Allows the view, addition, elimination and update of an user's pets reminders.

#### View
- GET /api/reminders
- GET /api/reminders/:id

#### Elimination
- DELETE /api/reminders/:id


#### Addition
- POST /api/reminders/

#### Update
- UPDATE /api/reminders/:id
 -  Body example (POST, UPDATE): 
 ```
{
    "name": "Dar de comer",
    "alarmDate": "11/22/2021 22:00:00"
}
```

### Diary Entries

Allows the view, addition, elimination and update of an user's pets diary entrie.

#### View
- GET /api/diaryEntries
- GET /api/diaryEntries/:id

#### Elimination
- DELETE /api/diaryEntries/:id

#### Addition
- POST /api/diaryEntries/

#### Update
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

# API
## Registro
URL: host:8800/api/auth/register

Método: POST

Headers de solicitud: Ninguno en especifico

Body de solicitud: 
```json
    {
        "email": "email-user-test1",
        "password": "user-test2",
        "username": "user-test2"
    }
```

Status de respuesta: 
* 200 Solicitud correcta, usuario creado.
* 400 Representa error de la solicitud o datos erróneos 
* 500 Error del backend

Headers de respuesta esperada: Ninguno notable

Body de respuesta: 
* En status 200:
    ```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...v0xmpX8sdSxj7phffcsc--AqhjiVrN1ZbnIlTVjtaCI"
    }
    ```
* En status 400: Ejemplo al existir un usuario
    ```json
    {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "username": 1
        },
        "keyValue": {
            "username": "user-test2"
        }
    }
    ```
* En estatus 500: Ejemplo de existir un error en el backend
    ```json
        {}
    ```
## LOGIN

URL: host:8800/api/auth/login

Método: POST

Headers de solicitud: Ninguno en especifico

Body de solicitud: 
```json
    {
        "email": "email-user-test1",
        "password": "user-test1"
    }
```

Status de respuesta: 
* 200 Solicitud correcta, login correcto.
* 400 Representa error de la solicitud o datos erróneos
* 500 Error del backend

Headers de respuesta esperada: Ninguno notable

Body de respuesta: 
* En status 200:
    ```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...v0xmpX8sdSxj7phffcsc--AqhjiVrN1ZbnIlTVjtaCI"
    }
    ```
* En status 400: Ejemplo al no existir un usuario
    ```json
        User not found
    ```
* En estatus 500: Ejemplo de existir un error en el backend
    ```json
        {}
    ```

# Actualizar a usuario

URL: host/api/users/:id

Ejemplo: localhost:8800/api/users/62df5890b010114e2c4d813b

Método: PUT

Headers de solicitud: 
```json
    {
        authorization: eyJhbGciOiJIUzI1NiIsI...nR5cCI6IkpXVCJ9J1c-rFb8
    }
```

Body de solicitud: 

El body puede llevar cualquiera de los valores del usuario a actualizar.

Ejemplo con los posibles campos a actualizar

```json
    {
        "email": "email-user-test2",
        "password": "user-test2",
        "username": "user-test2"
    }
```

Status de respuesta: 
* 200 Solicitud correcta, Actualización correcta
* 400 Se trata de actualizar a otro usuario
* 500 Error del backend

Headers de respuesta esperada: Ninguno notable

Body de respuesta: 

Se envía token de sesión actualizado, este token debe remplazar al antiguo

* En status 200:
    ```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...v0xmpX8sdSxj7phffcsc--AqhjiVrN1ZbnIlTVjtaCI"
    }
    ```
* En status 400: Al tratar de actualizar a otro usuario
    ```json
        "You can only update your account"
    ```
* En estatus 500: Ejemplo de existir un error en el backend
    ```json
        {}
    ```

# Actualizar a usuario

URL: host/api/users/:id

Ejemplo: localhost:8800/api/users/62df5890b010114e2c4d813b

Método: PUT

Headers de solicitud: 
```json
    {
        authorization: eyJhbGciOiJIUzI1NiIsI...nR5cCI6IkpXVCJ9J1c-rFb8
    }
```

Body de solicitud: 

El body puede llevar cualquiera de los valores del usuario a actualizar.

Ejemplo con los posibles campos a actualizar

```json
    {
        "email": "email-user-test2",
        "password": "user-test2",
        "username": "user-test2"
    }
```

Status de respuesta: 
* 200 Solicitud correcta, Actualización correcta
* 400 Se trata de actualizar a otro usuario
* 500 Error del backend

Headers de respuesta esperada: Ninguno notable

Body de respuesta: 

Se envía token de sesión actualizado, este token debe remplazar al antiguo

* En status 200:
    ```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...v0xmpX8sdSxj7phffcsc--AqhjiVrN1ZbnIlTVjtaCI"
    }
    ```
* En status 400: Al tratar de actualizar a otro usuario
    ```json
        "You can only update your account"
    ```
* En estatus 500: Ejemplo de existir un error en el backend
    ```json
        {}
    ```

# Seguir a Usuario

URL: host/api/users/:id/follow

Ejemplo: localhost:8800/api/users/62e0b51d6432d04c700f2561/follow

Método: PUT

Headers de solicitud: 
```json
{
    authorization: eyJhbGciOiJIUzI1NiIsI...nR5cCI6IkpXVCJ9J1c-rFb8
}
```

Body de solicitud: 

Ninguno


Status de respuesta: 
* 200 Solicitud correcta, Follow correcto
* 403 Error en los datos de la solicitud
* 500 Error del backend

Headers de respuesta esperada: Ninguno notable

Body de respuesta: 

Se envía token de sesión actualizado, este token debe remplazar al antiguo

* En status 200:
    ```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...v0xmpX8sdSxj7phffcsc--AqhjiVrN1ZbnIlTVjtaCI"
    }
    ```
* En status 403: Se trata de seguir a un usuario ya seguido o se trata de seguir a si mismo.
    ```json
        "You can't follow yourself""
    ```

    ```json
        "You already follow this user""
    ```
* En estatus 500: Ejemplo de existir un error en el backend
    ```json
        {}
    ```

# Dejar de seguir a Usuario

URL: host/api/users/:id/unfollow

Ejemplo: localhost:8800/api/users/62e0b51d6432d04c700f2561/unfollow

Método: PUT

Headers de solicitud: 
```json
{
    authorization: eyJhbGciOiJIUzI1NiIsI...nR5cCI6IkpXVCJ9J1c-rFb8
}
```

Body de solicitud: 

Ninguno


Status de respuesta: 
* 200 Solicitud correcta, Unfollow correcto
* 403 Error en los datos de la solicitud
* 500 Error del backend

Headers de respuesta esperada: Ninguno notable

Body de respuesta: 

Se envía token de sesión actualizado, este token debe remplazar al antiguo

* En status 200:
    ```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...v0xmpX8sdSxj7phffcsc--AqhjiVrN1ZbnIlTVjtaCI"
    }
    ```
* En status 403: Se trata de dejar de seguir a un usuario ya seguido o se trata de dejar de seguir a si mismo.
    ```json
        "You can't unfollow yourself""
    ```

    ```json
        "You don't follow this user""
    ```
* En estatus 500: Ejemplo de existir un error en el backend
    ```json
        {}
    ```


# Obtener información de un usuario
Se puede obtener información a partir del id o del username, esto puede hacer que el id o el username se omitan pero uno de los dos deben existir

URL: host:8800/api/users?userId=:id&username:Username

Ejemplo: localhost:8800/api/users?userId=62df5890b010114e2c4d813b

Método: GET

Headers de solicitud: 
```json
{
    authorization: eyJhbGciOiJIUzI1NiIsI...nR5cCI6IkpXVCJ9J1c-rFb8
}
```

Body de solicitud: 

Ninguno

Status de respuesta: 
* 200 Solicitud correcta, Unfollow correcto
* 500 Error del backend o no se obtuvo ningún usuario a partir de los parámetros

Headers de respuesta esperada: Ninguno notable

Body de respuesta: 

Ejemplo
```json
{
    "followers": [],
    "following": [
        "62e0b51d6432d04c700f2561"
    ],
    "isAdmin": false,
    "_id": "62df5890b010114e2c4d813b",
    "username": "user-test1",
    "email": "email-user-test1"
}
```

# Subir archivo

URL: host:8800/api/files/

Método: POST

Headers de solicitud:
```json
{
    authorization: eyJhbGciOiJIUzI1NiIsI...nR5cCI6IkpXVCJ9J1c-rFb8
}
```

Body de solicitud: 
form-data body
```json
{
    'uploadedFile': File,
    'description': 'File description'
}
```

Body de respuesta:

Estatus 200:
```json
{
    'url': "FileURL"
}
```

# Compartir un archivo

URL: localhost:8800/api/files/share

Método: POST

Headers de solicitud:
```json
{
    authorization: eyJhbGciOiJIUzI1NiIsI...nR5cCI6IkpXVCJ9J1c-rFb8
}
```

Body de solicitud: 
form-data body
```json
{
    "fileID": "62f3416f8cd3420511f8f3bb",
    "sharedUserID": "62e0b751d8e5cc5e906f5dcd"
}
```
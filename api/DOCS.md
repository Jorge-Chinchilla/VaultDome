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
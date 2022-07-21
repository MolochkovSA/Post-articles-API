# Post articles

# Перед запуском проекта:

1. Создать в корне проекта (на одном уровне с package.json) файл с именем `.env`
2. Добавить в файл следующий код

```
# Debug
DEBUG='server:*,router:*,db'

# Server
PORT=8000

# Mongo DB URL
DB_URL='mongodb://localhost:27017/smolochkov'

# Admin profile
ADMIN={"name":"admin", "sex":"male","birthDay":"1988-01-01", "phone": "+7-123-456-78-90", "email": "admin@mail.ru", "password":"Very_strong_pa$$word_is%123456789", "isAdmin": true}

# JWT password
PASSWORD='Very_secret_pa$$word_is%123456789'

# Locked user properties
LOCKED_USER_PROPERTIES = isAdmin, articles, created, modified, __v

# Locked articles properties
LOCKED_ARTICLES_PROPERTIES = author, check
```

# Тестовые данные для наполнения

## user:

{"name":"Tom","sex": "male", "birthDay":"1988-01-01","phone":"+7-123-456-78-00", "email":"mail@mail.ru","password":"Sw331@111"}

## article:

{"theme":"Some theme", "content":"Very interesting text"}

# Документация по проекту

[Swagger доки]().

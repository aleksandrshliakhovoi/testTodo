# test todo
## heroku https://ancient-inlet-66547.herokuapp.com/

## Серверная часть

* Серверная часть написана на Express JS
* Использовался шаблонизатор EJS

## Фронтэнд
На фронтэнде использовалcя
* Vanilla JS 

##### Структура директорий

```

├───model           Директория с моделями проекта
├───node_modules    Модули проекта
├───public          Публичная директория
│   └───img         Директория с изображениями
├───routes          Директория маршрутизации проекта
└───views           Директория с шаблонами страниц

```

## База данных
##### Структура БД
```
    +--------------------+
    | Tables_in_new_todo |
    +--------------------+
    | projects           |
    | tasks              |
    | users              |
    +--------------------+
    mysql> users;
    +--------------+--------------+------+-----+---------+-------+
    | Field        | Type         | Null | Key | Default | Extra |
    +--------------+--------------+------+-----+---------+-------+
    | iduser       | varchar(100) | NO   | PRI | NULL    |       |
    | username     | varchar(100) | NO   |     | NULL    |       |
    | useremail    | varchar(100) | NO   |     | NULL    |       |
    | userpassword | varchar(255) | NO   |     | NULL    |       |
    +--------------+--------------+------+-----+---------+-------+
    mysql> projects;
    +-------------+--------------+------+-----+---------+-------+
    | Field       | Type         | Null | Key | Default | Extra |
    +-------------+--------------+------+-----+---------+-------+
    | idproject   | varchar(45)  | NO   | PRI | NULL    |       |
    | projectname | varchar(255) | YES  |     | NULL    |       |
    | iduser      | varchar(45)  | NO   |     | NULL    |       |
    +-------------+--------------+------+-----+---------+-------+
    mysql> tasks;
    +--------------+--------------+------+-----+---------+----------------+
    | Field        | Type         | Null | Key | Default | Extra          |
    +--------------+--------------+------+-----+---------+----------------+
    | idtasks      | int          | NO   | PRI | NULL    | auto_increment |
    | taskcontent  | varchar(255) | NO   |     | NULL    |                |
    | taskdeadline | varchar(40)  | NO   |     | NULL    |                |
    | idproject    | varchar(45)  | NO   |     | NULL    |                |
    +--------------+--------------+------+-----+---------+----------------+

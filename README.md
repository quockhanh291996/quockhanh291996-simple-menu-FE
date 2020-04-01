# SIMPLE MENU

# Summary
Welcome to a small project creat for the menu. 

# Detail Features
This appilication contains:
* 2 models
  * Category: The category of menu, contains many items
  * Item: The menu items that are related with menu
* 2 roles of user:
  * Admin: Have all permissions with models
  * Standard: Just view the result
 
# Notes
* Some features, code in this project maybe not a good solution, because I want to focus on demo, so sometime I make them in the easy way
* There are some errors with token on FE, sometime it work incorrectly, I will fix later. SO, for now, just refresh the page to solve it.
* Because I use the sqlite so sometime the performance is not good. If you meet errors with DB, please remove and create ne, or use another database.

### Tech

We split the application to 2 project:
* Back-end:
  * Language: Python
  * Framework: Django
  * Database: SQL (base on your environment config, but sqlite by default)
* Front-end
  * Language: Javascript (Typescript)
  * Framework: React + Mobx
  * Another: Webpack
 
Installation
----

### Back-end ([Git](https://github.com/quockhanh291996/simple-menu-BE))
**NOTE: I haven't write script to setup the virtual environment for Back-end, so if you want run it in a virtual environment, please setup by yourself**

1/ Access the project directory

2/ Installl requirements 
```sh
    pip install - r requirements.txt
```

3/ Setup and load data
```sh
    make load_init_data
```

4/ Run server
```sh
    make run_server
```
*/ After step 2, we can use this commnd to setup and run:
```sh
    make run_demo
```
**If you meet any errors with above, plese use those command**
```sh
    pip install - r requirements.txt
    python manage.py migrate
	python manage.py init_menu_permission
	python manage.py init_user_permission
	python manage.py runserver
```

**If you want use another database, please setup package and add configuration to .env file**
```sh
    # Configuration for database
    DATABASE_ENGINE=
    DATABASE_NAME=
    DATABASE_USER=
    DATABASE_PASSWORD=
    DATABASE_HOST=
    DATABASE_PORT=
```

### Front end ([Git](https://github.com/quockhanh291996/simple-menu-FE))
1/ Access the project directory

2/ Installl requirements 
```sh
    make setup_project
```

3/ Run server
```sh
    make start_project
```
*/ After step 2, we can use this commnd to setup and run:
```sh
    make run_demo
```

**If you meet any errors with above, plese use those command**
```sh
    npm install
	cat .env.example > .env
	npm start
```

### Tested Environment
* OS: MacOS
* Python: 3.7.3
* Node: 12.16

### API Design
### Token
| METHOD | URL | Body | Purpose |
| ------ | ------ | ------ | ------ |
| GET | /api/token/ | username: string, password: string | Get token  |

#### Admin
| METHOD | URL | Body | Purpose |
| ------ | ------ | ------ | ------ |
| GET | /api/users/ | N/A | Get all user |
| GET | /api/users/id | N/A | Get detail user |
| POST | /api/users/ | username: string, password: string, email: string; roleID: number[] | Create the new user | 
| PUT | /api/users/:id | username: string, password: string, email: string; roleID: number[] | Update profile of user (**not tested**) |
| DELETE | /api/users/:id | N/A | Delete an user (**not tested**) |

#### User Role
| METHOD | URL | Body | Purpose |
| ------ | ------ | ------ | ------ |
| GET | /api/roles/ | N/A | Get user's role |

**Instead using groupcode to synchonize with FE & BE, I get the id on data for faster**

#### Category
| METHOD | URL | Body | Purpose |
| ------ | ------ | ------ | ------ |
| GET | /api/categories/ | N/A | Get all category |
| GET | /api/categories/:id | N/A | Get detail category |
| POST | /api/categories/ | name: string | Create the new category | 
| PUT | /api/categories/:id | name: string | Update category|
| DELETE | /api/categories/:id | N/A | Delete a category  |

#### Category
| METHOD | URL | Body | Purpose |
| ------ | ------ | ------ | ------ |
| GET | /api/items/ | N/A | Get all items (**use "categoryID" parameter to filter item**)|
| GET | /api/items/:id | N/A | Get detail item |
| POST | /api/items/ | name: string, description: string, category: number, thumbnail_image: file | Create the new item | 
| PUT | /api/items/:id | name: name: string, description: string, category: number, thumbnail_image: file | Update item|
| PATCH | /api/items/:id | name: name: string, description: string, category: number, thumbnail_image: file | Update item partially|
| DELETE | /api/items/:id | N/A | Delete an item  |

**NOTE: All APIs to get data are implemented pagination, but in the simple way, I will get all data in FE**

-------------------------
That's all. Hope you will be interested with this project. So, if you see any problems, please feel free to contact me.

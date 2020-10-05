This is a student project we made as part of our education at [Soy Henry](https://www.soyhenry.com/), which consisted of creating a full-stack React application from scratch.

### Our stack of technologies:

- Front End:
    + HTML - CSS - Javascript
    + React
    + React-Bootstrap
    + Redux

- Back End:
    + Node.js
    + Express
    + Passport

- Database: 
    + Sequelize
    + PostgreSQL

# How to start the project:

If you want to see the page for yourself, you'll need to do the following:

- Clone the repository
- Create a `.env` file in the `client` folder with the following contents: 
```
REACT_APP_API_URL=http://localhost:3001
```

- Install [PostgreSQL](https://www.postgresql.org/) on your computer and create a database called `development`.


- Create a `.env` file in in the `api` folder with the following contents:
```
DB_USER={Your postgreSQL user}
DB_PASSWORD={Your postgreSQL password}
DB_HOST=localhost

//create your project in
//console.developers.google.com/
user= your google project user
clientId= your client ID
clientSecret= your client secret

// get your access and refresh token from google playground 
accessToken=
refreshToken= 


```

The app doesn't have any products or users created by default, you'll have to add them yourself! In order to do so, you'll have to log in as an admin. The default admin is:

```
Email: admin@admin.com
Password: admin123
```


# Previews

### Home page:

![alt text](./client/src/testImages/home.png "Home Page")

### Product Page:
![alt text](./client/src/testImages/product-detail.png "Product Page")

### Login:
![alt text](./client/src/testImages/login.png "Login")

### Admin Control Panel:
![alt text](./client/src/testImages/admin-panel.png "Admin Control Panel")

### Purchase Order:
![alt text](./client/src/testImages/checkout.png "Checkout")

### 404 Page:
![alt text](./client/src/testImages/not_found.jpg "404 Page")

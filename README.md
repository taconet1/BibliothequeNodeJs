# BibliothequeNodeJs

BibliothequeNodeJs is an library application, developed entirely with Hapi (NodeJs), during my sandwich course in web development.

[Subject](https://dancole.gitbook.io/nodejs/tp/projet)

## Installation

Clone the project.

```bash
git clone https://github.com/taconet1/BibliothequeNodeJs.git
```

### .env
Variable for NodeMailer plugin :

```nodejs
NODEMAILER_HOST = 'smtp.ethereal.email'
NODEMAILER_PORT = 587
```

Don't forget to adapt database variables for your database connection if the default variables does not match with yours.

```
DB_HOST = '0.0.0.0'
DB_PORT = '3307'
DB_USER = 'root'
DB_PASSWORD = ''
DB_DATABASE = 'bibliothequenodejs'
```

### Run the project

```
cd BibliothequeNodeJs
npm start
```

Or install nodemon to update automatically the server (useful for development).

```
npm install -g nodemon
```

Run the project.
```
cd BibliothequeNodeJs
nodemon server
```
# System Requirements

- [Node.js](https://nodejs.org/en) 16.8 or later.
- macOS, Windows (including WSL), and Linux are supported.
- [MySQL server](https://dev.mysql.com/downloads/mysql/) according to your system.

# Setup

## MySQL Setup

- In case you need tutorial for **MySQL** installation, follow [this link](https://www.geeksforgeeks.org/how-to-install-mysql-on-macos/).

- After installing **MySQL**, you can use your preferred method(shell or workbench) and create an empty database for the project.

## Package installation

- Run `npm install` to make sure that there are no missing packages for running the application.

## Database Connection

- Create a file named **.env** in the root directory of the project folder.

- Copy the lines of code from **.env.example** to **.env**.

- Change the connection string based on your **MySQL** credentials and database you want to use. _(details are described in comment lines which you just copied)_

## Database Setup

- First, run `npx prisma migrate dev --name init` for prisma migration according to your database.

- Then, run `npx prisma generate client` to let prisma create a client that works with your database.

# How to Run

## Before you run the Project

- Make sure you have two tables named **scores** and **users** tables in your database that will work with the project.

## Now you can run the project

- Open terminal(command Prompt) and change directory to app directory.

- Alternatively, you can locate the app directory and open it in the terminal.

- Once you are on terminal opened app directory, run `npm run dev` to start the app.

- Running the command will show you a prompt in console where you can see the running application.

- By default, **Next.js** app runs on http://localhost:3000/.

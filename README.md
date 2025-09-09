## Setup Instructions

### 1. Set Up MySQL Database
Before starting the server, you must set up your MySQL database.  
Run the `DBquerries.sql` file to initialize the schema and tables.

---

### 2. Configure Environment Variables
Create a `.env` file in the project root and add the following:

```env
# Server Configuration
PORT=5000

# MySQL Database Connection
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

###3. Install Dependencies & Start the Server

```
# First, install dependencies
npm install

# Then, start the server
node server.js
```

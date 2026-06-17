# VIP_C2_House_Rent_Amith_Koka

## HouseHunt - Rental Property Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application developed as part of a Summer Internship Project.

HouseHunt provides a platform for property owners to list rental properties and for renters to browse, book, and manage property inquiries. The application includes role-based access for Admins, Owners, and Renters.

---

## Features

### Admin
- Manage users
- View all registered owners and renters
- Approve owner accounts
- Monitor platform activities

### Owner
- Register and login
- Add new properties
- Upload property images
- Edit property details
- Delete properties
- View booking requests
- Accept or reject bookings

### Renter
- Register and login
- Browse available properties
- Search and filter properties
- View property details
- Book available properties
- Track booking status

### General Features
- JWT Authentication
- Role-based Authorization
- Property Image Upload
- MongoDB Database Integration
- Responsive User Interface
- Secure Password Storage using Bcrypt

---

## Technology Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Ant Design

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer
- Cookie Parser

### Database
- MongoDB

---

## Project Structure

```text
VIP_C2_House_Rent_Amith_Koka
│
├── Client
│   └── Frontend
│       ├── public
│       ├── src
│       ├── package.json
│
├── Server
│   └── Backend
│       ├── controllers
│       ├── middlewares
│       ├── models
│       ├── routes
│       ├── uploads
│       ├── package.json
│       └── index.js
│
└── README.md
```

---

## Prerequisites

Before running the project, ensure the following software is installed:

- Node.js (v18 or later recommended)
- MongoDB Community Server
- MongoDB Compass
- Git

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd VIP_C2_House_Rent_Amith_Koka
```

### 2. Install Frontend Dependencies

```bash
cd Client/Frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../../Server/Backend
npm install
```

---

## Environment Variables

Create a `.env` file inside:

```text
Server/Backend
```

Example:

```env
PORT=8001
MONGO_URL=mongodb://127.0.0.1:27017/houserent
JWT_SECRET=your_jwt_secret_key
```

---

## Running MongoDB

Start MongoDB Service before running the application.

Verify MongoDB is running:

```bash
mongosh
```

or connect using MongoDB Compass:

```text
mongodb://localhost:27017
```

---

## Running the Backend

Open Terminal 1:

```bash
cd Server/Backend
npm install
npx nodemon index.js
```

Expected Output:

```text
MongoDB Connected Successfully
Server is running on port 8001
```

Backend URL:

```text
http://localhost:8001
```

---

## Running the Frontend

Open Terminal 2:

```bash
cd Client/Frontend
npm install
npm run dev
```

Expected Output:

```text
Local: http://localhost:5173
```

Frontend URL:

```text
http://localhost:5173
```

---

## Default Workflow

### Owner

1. Register as Owner
2. Login
3. Add Property
4. Manage Property Listings
5. Handle Booking Requests

### Renter

1. Register as Renter
2. Login
3. Browse Available Properties
4. Book a Property
5. Track Booking Status

### Admin

1. Login as Admin
2. Approve Owner Accounts
3. Manage Users
4. Monitor Platform Data

---

## Security Features

- Password Hashing using Bcrypt
- JWT Authentication
- Protected Routes
- Owner Authorization Checks
- Booking Validation
- Role-Based Access Control

---

## Future Enhancements

- Online Payment Integration
- Property Location Maps
- Email Notifications
- Wishlist Functionality
- Property Reviews and Ratings
- Advanced Search Filters

---

## Author

**Amith Koka**

B.Tech Computer Science and Engineering  
Anurag University

Summer Internship Project – MERN Stack Development

---

## License

This project is developed for educational and internship purposes.

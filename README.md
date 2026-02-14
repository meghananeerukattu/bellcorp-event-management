# Bellcorp Event Management Application

## Project Overview
This is a full-stack Event Management Application built using the MERN stack.
The platform allows users to:
- Register and login securely
- Browse available events
- Search events dynamically
- View event details
- Register for events
- Cancel registrations
- View upcoming and past events in a personal dashboard
---
## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
---
## Database Design
The application uses three collections:
### User
- name
- email (unique)
- password (hashed)
### Event
- name
- organizer
- location
- date
- description
- capacity
- availableSeats
- category

### Registration
Links User and Event to form a many-to-many relationship.
User → Registration → Event

---

## Features Implemented
- User Registration
- User Login
- Protected Dashboard Route
- Event Listing
- Search Functionality
- Pagination (Backend)
- Event Registration
- Cancel Registration
- Seat Availability Management
- User Dashboard 

---
## How to Run Locally

### Backend
```bash
cd server
npm install
npm run dev
---

### Frontend
cd client
npm install
npm start

### Architecture Overview

=>The application follows a modular architecture:
- Backend handles authentication, event management, and registration logic.
- Frontend manages UI, routing, and state using Context API.
- JWT-based authentication secures protected routes.
- MongoDB stores relational data using references.
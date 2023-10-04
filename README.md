# Real-Time Chat Application

This is a real-time chat application built using React, Node.js, Express, and Socket.io. This application allows users to join chat rooms and exchange messages in real-time.

## Features

- **User Authentication**: Users can create accounts and log in to access chat rooms.
- **Real-Time Messaging**: Messages are delivered instantly to all users in the same chat room.
- **Multiple Chat Rooms**: Users can join different chat rooms and switch between them.
- **User Online Status**: Users can see who is online in the chat room.
- **Emoji Support**: Users can use emojis in their messages.

## Technologies Used

### Frontend

- React: A JavaScript library for building user interfaces.
- Socket.io-client: A JavaScript library for real-time web applications, used to communicate with the server.
- React Router: Used for routing within the React application.
- Axios: Used for making HTTP requests to the server.
- CSS: Styling of the application.

### Backend

- Node.js: A JavaScript runtime environment for running server-side applications.
- Express.js: A web application framework for Node.js.
- Socket.io: A library for real-time, bidirectional communication between web clients and servers.
- JSON Web Tokens (JWT): Used for user authentication and authorization.
- MongoDB: A NoSQL database for storing user information and chat messages.

## Installation and Setup

### Prerequisites

- Node.js and npm (Node Package Manager) installed.
- MongoDB installed and running.

### Frontend

**Clone this repository:**
git clone https://github.com/yourusername/real-time-chat-app.git
Navigate to the client directory:


cd client
Install dependencies:
npm install

Rename the .env.example file to .env and update the necessary environment variables such as the API URL.

Start the React development server:
npm start

The application should now be running at http://localhost:3000.

Backend
Navigate to the server directory:
cd server


Install dependencies:
Copy code
npm install

Rename the .env.example file to .env and update the necessary environment variables such as the MongoDB connection string and JWT secret key.

Start the Node.js server:

Copy code
npm start


The server should now be running at http://localhost:5000.

Usage
Register for an account or log in.
Create or join a chat room.
Start sending and receiving real-time messages.
Contributing
If you'd like to contribute to this project, please follow these guidelines:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and test thoroughly.
Create a pull request with a clear description of the changes.
License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Acknowledgments
Special thanks to the creators of React, Node.js, Express, and Socket.io for their amazing tools and libraries.

















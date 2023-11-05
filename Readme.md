# News Aggregator API

A a real-time chat application built with Node.js, Express, and Socket.IO for the backend. This application allows users to register, log in, engage in private chats with other registered users, create and participate in group chats, and share files seamlessly. The frontend is developed using React, which interfaces with the backend APIs and Socket.IO to provide users with an intuitive and interactive user interface.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Validation](#validation)
- [Endpoints](#endpoints)

## Features

- User Registration and Login: Users can create an account, log in securely.
- Private Chats: Registered users can initiate one-on-one private chats, ensuring secure and private communication.
- Group Chats: Users can create groups and chat with multiple participants simultaneously, fostering collaborative discussions.
- File Sharing: The application supports file sharing within chats, allowing users to exchange files effortlessly.
- Real-time Communication: Leveraging Socket.IO, the application provides real-time updates and notifications, enhancing the user experience.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- Node version 18 or above

## Installation

1. Clone this repository

```bash
git clone https://github.com/vazanth/realtime-chat-app.git
```

2. Install dependencies

```bash
npm install
```

3. Inside src/data folder add a users.json and chat.json file keep the below json format in the file

```
  {
    "users": []
  }

  {
    "chat": []
  }

```

4. Run Server

```bash
npm run dev
```

# Usage

You can browse the apis at <http://localhost:3000> using either in postman or curl or any api platform and access the fron-end app at <http://localhost:5173>

# Validation

# Endpoints

|                       Endpoint | Description                                           | Payload                 |
| -----------------------------: | :---------------------------------------------------- | :---------------------- |
|     `POST /api/users/sign-up ` | Register a new user.                                  | [sign-up](#sign-up)     |
|      `POST /api/users/sign-in` | Log in a user.                                        | [sign-in](#sign-in)     |
|   `GET /api/chat             ` | Retrieve the chat history of a user.                  |                         |
|   `POST /api/chat            ` | Create the chat for a user either individual or group | [post-chat](#post-chat) |
|    `PUT /api/chat/creategroup` | Creates a new group with the users needed for it .    | [crt-group](#crt-group) |
|    `GET /api/messages/:chatId` | Fetch chat messages for a particular chat             |                         |
|    `POST /api/messages/      ` | Creates a new message and store it in memory          | [crt-msg](#crt-msg)     |
| `POST /api/messages/send-file` | Send a file over the network to the server            | [upl-file](#upl-file)   |

## Payload Sample

# sign-up

```bash
  {
      "fullname": "adminuser",
      "email": "admin@gmail.com",
      "password": "Test12@4",
      "username": "admin"
  }
```

# sign-in

```bash
  {
    "email": "admin@gmail.com",
    "password": "Test1234"
  }
```

# post-chat

```bash
  {
    "recipientId": "d067eba1611b2d299d4c1"
  }
```

# crt-group

```bash
  {
    "recipientId": ["d067eba1611b2d299d4c1", "d067eba1611b2d299d4c1"],
    "groupName": "Test Group"
  }
```

# crt-msg

```bash
  {
    "sender": "d067eba1611b2d299d4c1",
    "content": "Hi"
  }
```

# upl-file

```send file as form data

```

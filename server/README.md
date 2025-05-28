# Task Manager Socket Server

This is the Socket.IO server for the Task Manager application, handling real-time updates for tasks.

## Setup

1. Install dependencies:
```bash
npm install
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server runs on port 4000 by default and accepts connections from `http://localhost:3000`.

## Features

- Real-time task creation
- WebSocket connection management
- CORS enabled for local development 
# Sorsend Task Manager

A real-time task management module built with Next.js (App Router), Prisma/PostgreSQL, Ant Design, Tailwind CSS, and Socket.IO.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your database:**
   ```bash
   npx prisma migrate dev
   ```

3. **Start the Next.js app:**
   ```bash
   npm run dev
   ```

4. **Start the Socket.IO server:**
   ```bash
   node server/socket-server.js
   ```

## Features

- Real-time project/task updates
- Role toggle (Manager/Employee)
- Toast notifications for feedback
- Debounce to prevent duplicate tasks
- Responsive, clean UI

## Tech Stack

- Next.js (App Router)
- Prisma + PostgreSQL
- Ant Design, Tailwind CSS
- Socket.IO

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/              # API Routes
│   │   ├── projects/     # Project endpoints
│   │   │   ├── [id]/     # Dynamic project routes
│   │   │   └── route.ts  # Project CRUD operations
│   │   └── tasks/        # Task endpoints
│   │       ├── [id]/     # Dynamic task routes
│   │       └── route.ts  # Task CRUD operations
│   └── projects/         # Project pages
├── components/           # React components
│   ├── common/           # Shared components
│   └── task/             # Task-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
│   └── prisma.ts         # Prisma client setup
└── prisma/               # Prisma schema and migrations
    └── schema.prisma     # Database schema
```

## Database Relationships (Prisma)

### Models

#### Project
```prisma
model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tasks       Task[]   // One Project has many Tasks
}
```

#### Task
```prisma
model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  dueDate     DateTime
  priority    Priority @default(MEDIUM)
  status      Status   @default(TODO)
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade) // Each Task belongs to one Project
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Relationships
- **One-to-Many:** A `Project` can have multiple `Task`s, but each `Task` belongs to exactly one `Project`.
- **Cascade Delete:** If a `Project` is deleted, all its associated `Task`s are automatically deleted (`onDelete: Cascade`).

## Technical Questions (Concise Answers)

**1. If this module were used by 10,000+ users, what would you change?**  
Do shtoja authentication, rate limiting, and optimize DB queries. Horizontal scaling for the Socket.IO server (e.g., Redis adapter).

**2. What risks or edge-cases could occur?**  
Race conditions on task updates, network disconnects, and duplicate submissions. Handle errors and validate on both client and server.

**3. How would you prevent task duplication in a webhook system?**  
Duke perdorur ID unike per cdo task ose idempotency keys to ignore repeated webhook events.

## Technical Questions
### 1. Nese ky modul do te perdorej nga 10,000+ perdorues, cfare do ndryshoj

Disa ndryshime do ishin te nevojshem:

1. **Database Optimization**:
   - Implement database sharding
   - Indeksim per fushat qe kerkohen shpesh
   - Add proper indexing on frequently queried fields
   - Connection pooling
   - Read replicas for better read performance

2. **Caching Layer**:
   - Implement Redis for caching frequently accessed data
   - Cache per listat e projekteve dhe numrin e detyrave
   - Use stale-while-revalidate pattern for better performance

3. **Real-time Updates**:
   - Move from Socket.IO to a more scalable solution like Redis Pub/Sub
   - Implement message queuing for task creation/updates
   - WebSocket clusters për menaxhim më të mirë të lidhjeve


4. **API Optimization**:
   - Implement API rate limiting
   - Add request batching
   - Implement proper pagination

### 2. Cfare rreziqesh ose edge-case mund te ndodhin?

1. **Konsistence e te dhenave**:
   - Race conditions during concurrent task creation
   - Mosperputhje mes te dhenave reale dhe databazes
   - Network failures during task creation

2. **Performance Issues**:
   - Memory leaks nga WebSocket te pambyllur
   - Database connection pool exhaustion
   - Slow queries with large datasets

3. **Security Concerns**:
   - WebSocket connection flooding
   - SQL injection (i mbrojtur nga Prisma)
   - XSS (i mbrojtur nga Next.js)
   - 

4. **User Experience**:
   - Suport offline
   - Browser compatibility
   - Mobile responsiveness

### 3. Si do e parandalosh dublimin e task-eve ne nje sistem webhook? 

1. **Idempotency Keys**:
   - Gjenero celesa unik per cdo kerkese
   - Ruaji ne Redis me kohezgjatje te kufizuar
   - Refuzo kerkesat e perseritura me te njejtin celes

2. **Request Deduplication**:
   - Implement request deduplication at the API gateway level
   - Use request signatures to identify duplicates
   - Cache recent requests to prevent duplicates

3. **Database Constraints**:
   - Add unique constraints on task identifiers
   - Use database transactions for atomic operations
   - Implement optimistic locking for concurrent updates

4. **Queue System**:
   - Use a message queue (e.g., RabbitMQ, Kafka)
   - Implement message deduplication
   - Use message groups to ensure ordered processing


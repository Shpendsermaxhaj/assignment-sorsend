# Task Manager

A real-time task management application built with Next.js, Prisma, PostgreSQL, and Socket.IO.

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Set up your PostgreSQL database and update the `.env` file with your database URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/task_manager"
```

4. Run Prisma migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## Features

- Project management
- Real-time task updates
- Task prioritization
- Due date tracking
- Status management
- Beautiful UI with Ant Design

## Tech Stack

- Next.js 14 (App Router)
- Prisma with PostgreSQL
- Socket.IO for real-time updates
- Ant Design for UI components
- Tailwind CSS for styling



## Technical Considerations

### 1. Scaling to 10,000+ Users

To scale this application for 10,000+ users, several changes would be necessary:

1. **Database Optimization**:
   - Implement database sharding
   - Add proper indexing on frequently queried fields
   - Use connection pooling
   - Consider read replicas for better read performance

2. **Caching Layer**:
   - Implement Redis for caching frequently accessed data
   - Cache project lists and task counts
   - Use stale-while-revalidate pattern for better performance

3. **Real-time Updates**:
   - Move from Socket.IO to a more scalable solution like Redis Pub/Sub
   - Implement message queuing for task creation/updates
   - Use WebSocket clusters for better connection management

4. **API Optimization**:
   - Implement API rate limiting
   - Add request batching
   - Use GraphQL for more efficient data fetching
   - Implement proper pagination

### 2. Potential Edge Cases and Risks

1. **Data Consistency**:
   - Race conditions during concurrent task creation
   - Inconsistent state between real-time updates and database
   - Network failures during task creation

2. **Performance Issues**:
   - Memory leaks from unclosed WebSocket connections
   - Database connection pool exhaustion
   - Slow queries with large datasets

3. **Security Concerns**:
   - WebSocket connection flooding
   - SQL injection (mitigated by Prisma)
   - XSS attacks (mitigated by Next.js)

4. **User Experience**:
   - Offline support
   - Browser compatibility
   - Mobile responsiveness

### 3. Preventing Task Duplication in Webhook System

To prevent task duplication in a webhook system:

1. **Idempotency Keys**:
   - Generate unique idempotency keys for each task creation request
   - Store these keys in Redis with a TTL
   - Reject duplicate requests with the same key

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


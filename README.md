# Yandere AI: Love.exe

A Next.js-based interactive visual novel game with AI-driven conversations and dynamic mood systems.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

You will also need accounts for:
- [Cloudinary](https://cloudinary.com/) (for image storage)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ice415-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/yandere-ai # or your Atlas URI

# Authentication (NextAuth.js)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key_here # Generate with: openssl rand -base64 32

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Database Seeding

To populate the database with initial data (waifu types, etc.), run the seed script:

```bash
npm run seed
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Run the test suite using Jest:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

## Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: React components (screens, UI, admin panel).
- `lib/`: Utility libraries (database connection, models, Cloudinary).
- `state/`: Global state management (GameContext, reducers).
- `data/`: Static data files (conversations, waifu types).
- `__tests__/`: Unit and integration tests.

## Features

- **Dynamic Conversations**: AI-simulated dialogue with branching paths.
- **Mood System**: Waifu's mood changes based on player choices (Happy, Sad, Angry, Yandere, etc.).
- **Affection System**: Track relationship progress.
- **Admin Panel**: Manage game state and waifu data.
- **Authentication**: User accounts and progress saving.


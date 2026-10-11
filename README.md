# Assignment 07

A modern web application built with **Next.js, TypeScript, and React**. The project uses Better Auth for authentication, MongoDB for database integration, and Tailwind CSS with DaisyUI and HeroUI for styling and UI components.

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Frontend:** React 19
- **Authentication:** Better Auth
- **Database:** MongoDB
- **Styling:** Tailwind CSS 4, DaisyUI, and HeroUI
- **Icons:** Gravity UI Icons and Iconify

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm installed on your computer.

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd assignment-07
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and configure the environment variables required for authentication and database connectivity.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint |

## Project Structure

The application follows the Next.js App Router structure. Pages, layouts, components, API routes, and shared utilities can be organized within the `app` directory and related project folders.

## Environment Variables

Add the environment variables required by your application to `.env.local`, such as your MongoDB connection string, Better Auth secret, and application base URL.

Keep your environment files and secrets private. Never commit credentials to GitHub.

## Deployment

The application can be deployed on [Vercel](https://vercel.com/). Configure the required environment variables in your deployment settings before deploying.

For more information, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

**Built with Next.js and TypeScript.**
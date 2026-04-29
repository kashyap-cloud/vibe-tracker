# Vibe Tracker

A calming mental wellness vibe check-in and reflection tool.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I edit this code?

### Use your preferred IDE

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd vibe-tracker

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Deployment

This project can be built and deployed as a static site or using the included Dockerfile.

### Docker

To build and run with Docker:

```sh
docker build -t vibe-tracker .
docker run -p 8080:80 vibe-tracker
```

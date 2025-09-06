<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Itinerary - Todo List Web App

This is a modern todo list web application inspired by Todoist, built with React, TypeScript, Vite, and Tailwind CSS.

## Project Structure

- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent icons
- **date-fns** for date manipulation
- **Context API** for state management
- **Local Storage** for data persistence

## Key Features

- ✅ Task management (create, edit, delete, complete)
- 📅 Due dates and calendar views
- 🏷️ Priority levels and labels
- 📁 Project organization
- 🔍 Filters (Today, Upcoming, Projects)
- 💾 Local storage persistence
- 📱 Responsive design

## Code Style Guidelines

- Use functional components with hooks
- Prefer TypeScript interfaces over types
- Use Tailwind CSS classes for styling
- Keep components focused and reusable
- Use proper semantic HTML
- Handle loading and error states
- Implement proper accessibility features

## State Management

The app uses React Context API with useReducer for state management:
- `AppContext` provides global state
- `useApp` hook for consuming context
- Local storage for persistence
- Type-safe actions and state updates

## UI/UX Principles

- Clean, minimal design inspired by Todoist
- Consistent spacing and typography
- Intuitive navigation and interactions
- Responsive layout for all screen sizes
- Proper focus management and keyboard navigation

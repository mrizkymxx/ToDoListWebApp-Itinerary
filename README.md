# Itinerary - Your Personal Task Manager

A modern, feature-rich todo list web application inspired by Todoist. Built with React, TypeScript, and Tailwind CSS for a seamless task management experience.

## ✨ Features

- 📝 **Task Management**: Create, edit, delete, and complete tasks with ease
- 📅 **Due Dates**: Set and track due dates with smart date formatting
- 🏷️ **Priority Levels**: Organize tasks by priority (Low, Medium, High)
- 📁 **Projects**: Group related tasks into custom projects
- 🔍 **Smart Filters**: View tasks by Today, Upcoming, or custom filters
- 💾 **Auto-Save**: All data is automatically saved to local storage
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Clean UI**: Todoist-inspired interface with modern design

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todolistapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **date-fns** - Modern JavaScript date utility library
- **clsx** - Utility for constructing className strings

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── TaskList.tsx    # Main task view
│   ├── TaskItem.tsx    # Individual task component
│   └── AddTaskForm.tsx # Task creation form
├── context/            # React Context for state management
│   └── AppContext.tsx  # Main app state and actions
├── types/              # TypeScript type definitions
│   └── index.ts        # Task, Project, and App types
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 Usage

### Creating Tasks
1. Click the "Add task" button or the quick add button
2. Enter your task title and optional description
3. Set due date, priority, and project
4. Press Enter or click the send button to save

### Managing Projects
- Use the sidebar to switch between different projects
- View task counts for each project
- Organize tasks by creating custom projects

### Smart Views
- **Today**: See tasks due today
- **Upcoming**: View tasks for the next 7 days
- **Projects**: Browse tasks organized by project

### Completing Tasks
- Click the checkbox next to any task to mark it complete
- Completed tasks are moved to a separate section
- View your progress with task counts

## 🎨 Customization

The app uses Tailwind CSS for styling. You can customize:

- **Colors**: Modify the color palette in `tailwind.config.js`
- **Typography**: Adjust font families and sizes
- **Components**: Update component styles in the CSS files
- **Icons**: Replace Lucide icons with your preferred icon library

## 💾 Data Persistence

All data is automatically saved to your browser's local storage:
- Tasks and their properties
- Project configurations
- App preferences and view states

No server or account required - everything works offline!

## 🚀 Building for Production

Create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

---

**Made with ❤️ for productive task management**

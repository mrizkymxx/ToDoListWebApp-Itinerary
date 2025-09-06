import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';

function App() {
  return (
    <AppProvider>
      <div className="h-screen flex bg-gray-50">
        <Sidebar />
        <TaskList />
      </div>
    </AppProvider>
  );
}

export default App;

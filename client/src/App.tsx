import NavBar from "./components/NavBar"
import TaskList from "./components/TaskList";
import { EthersProvider } from './context/EthersContext';
import { TodoListContractProvider } from './context/TodoListContractContext';
import { ToastProvider } from "./context/ToastContext";


function App() {
    return (
        <ToastProvider>
            <EthersProvider>
                <TodoListContractProvider>
                    <NavBar />
                    <TaskList />
                </TodoListContractProvider>
            </EthersProvider>
        </ToastProvider>
    )

}

export default App

import { useContext, useEffect, useState } from 'react'

import Task, { TaskDetails } from './Task'
import { useToast } from '../context/ToastContext';
import { EthersContext } from '../context/EthersContext';
import { TodoListContractContext } from '../context/TodoListContractContext';

export default function TaskList() {
    const { signer } = useContext(EthersContext);
    const { contract } = useContext(TodoListContractContext);
    const showToast = useToast();
    const [taskCount, setTaskCount] = useState(0);
    const [tasks, setTasks] = useState<TaskDetails[]>([]);

    useEffect(() => {
        if (signer && contract) {
            console.log('🔥 Fetching tasks...');
            fetchTasks();
        }
    }, [signer, contract])

    async function getTaskCount(): Promise<Number> {
        if (!contract) return 0;

        try {
            const taskCount = Number(await contract.taskCount());
            setTaskCount(taskCount);
            return taskCount;
        }
        catch (error) {
            showToast(`❌ Failed to fetch task count: ${error}`);
            return 0;
        }
    }

    async function fetchTasks() {
        if (!signer || !contract) return;

        try {
            const taskCount = await getTaskCount();
            const fetchedTasks: TaskDetails[] = [];

            for (let i = 0; i < Number(taskCount); i++) {
                const task = await contract.tasks(i);
                const taskDetails: TaskDetails = {
                    id: Number(task[0]),
                    content: task[1],
                    completed: task[2],
                };
                fetchedTasks.push(taskDetails);
            }
            setTasks(fetchedTasks);
            console.log('✅ Fetched tasks');
        } catch (error) {
            showToast(`❌ Failed to fetch tasks: ${error}`);
        }
    }

    async function handleCreateTask() {
        if (!signer || !contract) return;

        else {
            try {
                const tx = await contract.connect(signer).createTask("A new task");
                showToast(`🧾 Transaction hash: ${tx.hash}`);
                console.log(`🧾 Transaction hash: ${tx.hash}`)
            } catch (error) {
                showToast(`❌ Failed to create task: ${error}`);
            }
        }
    }

    return contract ? (
        <div className="mx-32 my-8 flex flex-col">
            <p className='text-center mb-4' > Task count: {taskCount}</p>
            <ul>
                {tasks.map((task) => {
                    return (
                        <Task key={task.id} id={task.id} content={task.content} completed={task.completed} />
                    )
                })}
            </ul>
            <button
                onClick={handleCreateTask}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
            >
                Create Task
            </button>
        </div >) : ""
}

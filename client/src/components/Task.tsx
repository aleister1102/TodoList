import { useContext } from 'react'
import { MdDelete } from "react-icons/md";

import { EthersContext } from "../context/EthersContext";
import { TodoListContractContext } from "../context/TodoListContractContext";
import { useToast } from "../context/ToastContext";
import Checkbox from "./Checkbox";

export interface TaskDetails {
    id: number;
    content: string;
    completed: boolean;
}

export default function Task({ id, content, completed }: TaskDetails) {
    const { signer } = useContext(EthersContext);
    const { contract } = useContext(TodoListContractContext);
    const showToast = useToast();

    async function handleDeleteTask() {
        if (!signer || !contract) return;
        try {
            const tx = await contract.connect(signer).deleteTask(id);
            showToast(`🧾 Transaction hash: ${tx.hash}`);
            console.log(`🧾 Transaction hash: ${tx.hash}`)
        } catch (error) {
            showToast(`❌ Failed to delete task: ${error}`);
        }


        console.log(`🗑️ Deleting task with ID = ${id} ...`)
    }

    return (
        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <Checkbox id={id} completed={completed} />
                    <span className={completed ? 'line-through' : ''}>
                        <h3>Id: {id}</h3>
                        <p>Content: {content}</p>
                    </span>
                </div>
                <MdDelete className="text-2xl hover:cursor-pointer hover:opacity-70 rounded-md"
                    onClick={handleDeleteTask}
                />
            </div>
        </div>
    );
}
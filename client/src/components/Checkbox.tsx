import { useContext } from "react";
import { EthersContext } from "../context/EthersContext";
import { TodoListContractContext } from "../context/TodoListContractContext";
import { useToast } from "../context/ToastContext";

export default function Checkbox({ id, completed }: { id: number, completed: boolean }) {
    const { signer } = useContext(EthersContext);
    const { contract } = useContext(TodoListContractContext);
    const showToast = useToast();

    async function handleToggleCompleted() {
        if (!signer || !contract) return;
        try {
            const tx = await contract.connect(signer).toggleCompleted(id);
            showToast(`🧾 Transaction hash: ${tx.hash}`);
            console.log(`🧾 Transaction hash: ${tx.hash}`)
        } catch (error) {
            showToast(`❌ Failed to toggle completed: ${error}`);
        }
    }

    return (
        <input
            type="checkbox"
            checked={completed}
            onChange={handleToggleCompleted}
            className="form-checkbox h-4 w-4 text-blue-500 mr-4" />
    );
}
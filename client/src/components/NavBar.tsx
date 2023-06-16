import ConnectButton from "./ConnectButton";
import { EthersContext } from "../context/EthersContext";
import { useContext} from "react";

export default function NavBar() {
    const { network, address } = useContext(EthersContext);

    return (
        <nav className="bg-blue-500 p-4 flex items-center">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-semibold text-lg">Todo List</div>
                <ul className="flex space-x-4 items-center">
                    <li className="text-white">
                        <span className="text-gray-200">Current network:</span> {
                            network ? network.name : 'Not connected'
                        }
                    </li>
                    <li className="text-white">
                        <span className="text-gray-200">Current address:</span> {
                            address ? address : 'Not connected'
                        }
                    </li>
                    <li>
                        <ConnectButton />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

import { useContext, useState } from 'react'
import { EthersContext } from '../context/EthersContext'

export default function ConnectButton() {
    const [isConnected, setIsConnected] = useState(false);
    const { connectToMetaMask, disconnectFromMetaMask } = useContext(EthersContext);

    async function handleConnectToMetaMask() {
        setIsConnected(!isConnected);

        if (!isConnected)
            await connectToMetaMask();
        else {
            await disconnectFromMetaMask();
        }
    }

    return (
        <button
            onClick={handleConnectToMetaMask}
            className={`hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl`}
        >
            {isConnected ? "Log out" : "Connect to Metamask"}
        </button>
    );
}

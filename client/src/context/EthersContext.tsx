import { ethers } from "ethers";
import { createContext, useState } from "react";
import { useToast } from "./ToastContext";

export type EthersContextType = {
    provider: ethers.providers.JsonRpcProvider | undefined,
    network: ethers.providers.Network | undefined,
    signer: ethers.providers.JsonRpcSigner | undefined,
    address: string,
    connectToMetaMask: () => Promise<void>,
    disconnectFromMetaMask: () => Promise<void>,
}

export const EthersContext = createContext<EthersContextType>({} as EthersContextType);

export function EthersProvider({ children }: { children: React.ReactNode }) {
    const showToast = useToast();
    const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | undefined>(undefined);
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | undefined>(undefined);
    const [network, setNetwork] = useState<ethers.providers.Network | undefined>(undefined);
    const [address, setAddress] = useState<string>('');

    async function connectToMetaMask() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            setProvider(provider);
            setNetwork(network);
            setSigner(signer);
            setAddress(address);

            showToast('✅ Connected to MetaMask.');
            console.log('🌐 Network: ', network);
            console.log('⚙️ Provider: ', provider);
            console.log('✍️ Signer: ', signer);
        } catch (error) {
            console.error('❌ Failed to connect to MetaMask:', error);
        }
    }

    async function disconnectFromMetaMask() {
        try {
            setProvider(undefined);
            setNetwork(undefined);
            setSigner(undefined);
            setAddress('');
            showToast('👋 Disconnected from MetaMask');
        } catch (error) {
            console.error('❌ Failed to disconnect from MetaMask:', error);
        }
    }

    return (
        <EthersContext.Provider value={{ provider, network, signer, address, connectToMetaMask, disconnectFromMetaMask }}>
            {children}
        </EthersContext.Provider>
    )
}

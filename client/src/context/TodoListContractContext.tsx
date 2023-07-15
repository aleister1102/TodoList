import React, { useContext } from 'react'
import { ethers } from 'ethers';
import { EthersContext } from './EthersContext';
import TodoList from '../../../build/contracts/TodoList.json'

const SEPOLIA_NETWORK_ID = 11155111;

export interface TodoListContractContextType {
    contract: ethers.Contract | null,
}

export const TodoListContractContext = React.createContext({} as TodoListContractContextType);

export function TodoListContractProvider({ children }: { children: React.ReactNode }) {
    const { provider } = useContext(EthersContext);
    const address = TodoList.networks[SEPOLIA_NETWORK_ID].address
    const abi = TodoList.abi
    const contract = provider ? new ethers.Contract(address, abi, provider) : null

    return (
        <TodoListContractContext.Provider value={{ contract }}>
            {children}
        </TodoListContractContext.Provider>
    )
}


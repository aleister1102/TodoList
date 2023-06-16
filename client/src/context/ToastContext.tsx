import React, { useState, useEffect } from 'react';

export type ToastContextType = (message: string) => void;

export const ToastContext = React.createContext<ToastContextType>(() => { });

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    function showToast(message: string) {
        setToastMessage(message);
    }

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (toastMessage) {
            timeout = setTimeout(() => {
                setToastMessage(null);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [toastMessage]);

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            {toastMessage && <Toast message={toastMessage} />}
        </ToastContext.Provider>
    );
}

function Toast({ message }: { message: string }) {
    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg border-blue-500 border-solid border-2 bg-white w-1/4 break-words`}>
            <span>{message}</span>
        </div>
    );
}

export function useToast() {
    return React.useContext(ToastContext);
}

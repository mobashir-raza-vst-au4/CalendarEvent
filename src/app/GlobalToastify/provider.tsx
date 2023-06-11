"use client";
import { ToastContainer } from 'react-toastify';

export function Providers({ children }: any) {
    return (
        <>
            <ToastContainer />
            {children}
        </>
    )
}
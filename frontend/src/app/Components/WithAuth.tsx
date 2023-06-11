'use client';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const WithAuth = (Component: any) => {
    const AuthCheck = (props: any) => {
        const router = useRouter();
        const pathname = usePathname();

        useEffect(() => {
            const token = localStorage.getItem("calendar_auth_token");
            const isLoggedIn = token ? JSON.parse(token) : false;
            // Check if the user is not logged in and redirect to the login page
            if (!isLoggedIn && ['/'].includes(pathname)) {
                router.push('/login');
                return;
            }

            if (isLoggedIn && ['/login', '/register'].includes(pathname)) {
                router.push('/');
                return;
            }

        }, [router]);

        // Render the wrapped component if the user is logged in
        return <Component {...props} />;
    };

    return AuthCheck;
};

export default WithAuth;

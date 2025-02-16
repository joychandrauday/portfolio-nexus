'use client'
import { store } from '@/Redux/features/store';
import React from 'react';
import { Provider } from 'react-redux';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default Providers;

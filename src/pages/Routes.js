import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontend from './Frontend';
import Auth from './Auth';
import Dashboard from './Dashboard';

export default function CustomRoutes() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<Frontend />} />
                    <Route path="/auth/*" element={<Auth />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

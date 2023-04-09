import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from './Components/Header'
import Footer from './Components/Footer'


export default function index() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

// import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AlternativeCriteria from './pages/AlternativeCriteria'
import Count from './pages/Count'
import CalculationResult from './pages/CalculationResult'

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="criteria" element={<AlternativeCriteria />} />
        <Route path="count" element={<Count />} />
        <Route path="result" element={<CalculationResult />} />
      </Routes>
    </BrowserRouter>
  )
}

export default router
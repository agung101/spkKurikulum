/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Login from './pages/Login'
import Register from './pages/Register'
import Pages from './pages'
import Home from './pages/Home'
import AlternativeCriteria from './pages/AlternativeCriteria'
import Spk from './pages/Spk'
import Result from './pages/Result'

const PrivateRoute = ({children}) => {  
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  } else {
    const decoded = jwtDecode(token)
    if (Date.now() >= decoded.exp* 1000)
      return <Navigate to="/login" replace />      
  }
  return children
}

const PublicRoute = ({children}) => {
  const token = localStorage.getItem('token') 
  if (token) {
    const decoded = jwtDecode(token) 
    if (Date.now() <= decoded.exp* 1000) 
      return <Navigate to="/" replace />    
  }
  return children
}

const router = () => {
  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
        <Route path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
        <Route path="/" 
          element={
            <PrivateRoute>
              <Pages />
            </PrivateRoute>            
          } >
          <Route index element={<Home />} />
          <Route path="criteria" element={<AlternativeCriteria />} />
          <Route path="spk" element={<Spk />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default router
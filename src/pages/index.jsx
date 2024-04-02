import { Outlet } from 'react-router-dom'
import Navbar from '../components/module/Navbar'

const Pages = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Pages
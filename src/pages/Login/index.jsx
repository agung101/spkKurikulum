import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const submitLogin = async (e) => {
    e.preventDefault()
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    const env = import.meta.env.VITE_API_URL

    try {
      setIsLoading(true)
      const res = await axios.post(env+'/user/login', data)
      setIsLoading(false)   
      localStorage.setItem('token', res.data.data.token)
      Swal.fire({
        icon: 'success',
        title: 'Masuk Sukses',
      })
      navigate('/')
    } catch(err) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        text: 'Email atau sandi salah',
      })
    }    
  }

  return (
    <main id='login' className='container-float d-flex justify-content-center align-items-center' style={{ background: "url('/img/login/library.webp') no-repeat center/cover", width:'100%', height:'100vh' }}>
      <div className='d-flex flex-column align-items-center rounded-4' style={{ backgroundColor: 'rgba(191, 184, 184, 0.5)', width: '35%' }}>
        <h2 className='fs-3 fw-bolder mb-0 text-gradient mt-5' style={{ fontFamily: 'Verdana, serif', marginTop: '2rem' }}>Masuk</h2>
        <h2 className='fs-5 fw-bolder mb-3'>SPK Kurikulum Sekolah</h2>
        <div className='bg-secondary-subtle w-100'>
          <p className="fs-6 fw-semibold mb-0 py-2 px-5 text-center">Silahkan masuk untuk menyimpan pengaturan alternatif dan kriteria.</p>
        </div>
        <form onSubmit={submitLogin} className="w-100 mt-4 px-5 pb-4 d-flex flex-column align-items-center border-bottom">
          <input type="email" name="email" className="form-control bg-secondary-subtle mb-3" placeholder="Email" required/>
          <input type="password" name="password" className="form-control bg-secondary-subtle mb-3" placeholder="Kata Sandi" required/>
          <button type="submit" className="btn btn-primary w-50" disabled={isLoading}>{isLoading ? '....Proses' : 'Masuk'}</button>
        </form>
        <div className='d-flex mt-3 mb-5 gap-2'>
          <p className='fs-6 mb-0 fw-semibold'>Belum punya akun?</p>
          <Link to="/register" className="bg-secondary-subtle px-2 rounded-3 text-decoration-none">
            <p className='mb-0'>Daftar</p>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Login
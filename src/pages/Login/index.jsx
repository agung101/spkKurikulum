/* eslint-disable no-undef */
// import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <main id='login' className='container-float d-flex justify-content-center align-items-center' style={{ background: "url('/img/login/library.webp') no-repeat center/cover", width:'100%', height:'100vh' }}>
      <div className='h-75 d-flex flex-column align-items-center rounded-4' style={{ backgroundColor: 'rgba(191, 184, 184, 0.5)', width: '35%' }}>
        <h2 className='fs-3 fw-bolder mb-0 text-gradient mt-5' style={{ fontFamily: 'Verdana, serif', marginTop: '2rem' }}>Masuk</h2>
        <h2 className='fs-5 fw-bolder mb-3'>SPK Kurikulum Sekolah</h2>
        <div style={{ backgroundColor: 'rgba(226,227,229, 1)' }}>
          <p className="fs-6 fw-semibold mb-0 py-2 px-5 text-center">Silahkan masuk untuk menyimpan pengaturan alternatif dan kriteria.</p>
        </div>
        <form className="w-100 mt-4 px-5 pb-4 d-flex flex-column align-items-center border-bottom">
          <input type="email" className="form-control bg-secondary-subtle mb-3" id="email" placeholder="Email"/>
          <input type="password" className="form-control bg-secondary-subtle mb-3" id="password" placeholder="Password"/>
          <button type="button" className="btn btn-primary w-50">Masuk</button>
        </form>
        <div className='d-flex mt-2 gap-2'>
          <p className='fs-6 mb-0 fw-semibold'>Belum mempunyai akun?</p>
          <Link to="/register" className="bg-secondary-subtle px-2 rounded-3 text-decoration-none">
            <p className='mb-0'>Daftar</p>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Login
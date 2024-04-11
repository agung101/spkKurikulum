import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()

  const submitRegister = async(e) => {
    e.preventDefault()
    const password = e.target.password.value
    const password2 = e.target.password2.value
    if (password!==password2)
      return Swal.fire({
        icon: 'error',
        text: 'Konfirmasi Kata Sandi Salah'
      })

    const data = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      password
    }
    const env = import.meta.env.VITE_API_URL
    
    try {
      Swal.fire({
        title: 'Tunggu Sebentar !',
        html: 'Sedang proses daftar akun',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      })
      await axios.post(env+'/user/register', data)
      Swal.close()
      Swal.fire({
        icon: 'success',
        title: 'Daftar Berhasil !',
      })
      navigate('/login')
    } catch (err) {
      if (err.response.data.data.message == 'Email already taken')
        return Swal.fire({
          icon: 'error',
          text: 'Email sudah dipakai, silahkan isi email lain'
        })      
      Swal.fire({
        icon: 'error',
        text: err.message
      })
    }
  }

  return (
    <main id='login' className='container-float d-flex justify-content-center align-items-center' style={{ background: "url('/img/login/library.webp') no-repeat center/cover", width:'100%', height:'100vh' }}>
      <div className='d-flex flex-column align-items-center rounded-4' style={{ backgroundColor: 'rgba(191, 184, 184, 0.5)', width: '35%' }}>
        <h2 className='fs-3 fw-bolder mb-0 text-gradient' style={{ fontFamily: 'Verdana, serif', marginTop: '2rem' }}>Daftar</h2>
        <h2 className='fs-5 fw-bolder mb-3'>SPK Kurikulum Sekolah</h2>
        <div className='bg-secondary-subtle w-100'>
          <p className="fs-6 fw-semibold mb-0 py-2 px-5 text-center">Isi data di bawah ini untuk membuat akun</p>
        </div>
        <form onSubmit={submitRegister} className="w-100 mt-4 px-5 pb-4 d-flex flex-column align-items-center border-bottom">
          <input type="text" name="fullname" className="form-control bg-secondary-subtle mb-3" placeholder="Nama Lengkap" required/>
          <input type="email" name="email" className="form-control bg-secondary-subtle mb-3" placeholder="Email" required/>
          <input type="password" name="password" className="form-control bg-secondary-subtle mb-3" placeholder="Buat Kata Sandi" required/>
          <input type="password" name="password2" className="form-control bg-secondary-subtle mb-3" placeholder="Konfirmasi Kata Sandi" required/>
          <button type="submit" className="btn btn-primary w-50">Daftar</button>
        </form>
        <div className='d-flex mt-3 mb-5 gap-2'>
          <p className='fs-6 mb-0 fw-semibold'>Sudah punya akun?</p>
          <Link to="/login" className="bg-secondary-subtle px-2 rounded-3 text-decoration-none">
            <p className='mb-0'>Masuk</p>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Register
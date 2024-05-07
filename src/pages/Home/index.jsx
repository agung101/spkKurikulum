import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="d-flex flex-column" style={{ background: "url('/img/home/bg-home.webp') no-repeat center/cover", width:'100%', height:'100vh' }}>
      <div className="d-flex flex-column align-items-center" style={{ marginTop: '6rem' }}>
        <h2 className="text-center">Selamat Datang di Website</h2>
        <h2 className="text-center">Sistem Pendukung Keputusan Penilaian Kurikulum</h2>
      </div>
      <div className="p-5 d-flex align-items-center mt-3 gap-2">
        <h5 className="mb-0">Pertimbangkan kembali keputusanmu menggunakan SPK Kurikulum</h5>
        <Link to='/criteria' className="btn btn-lg btn-light fw-bold">Mulai</Link>
      </div>
    </div>
  )
}

export default Home
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const path = location.pathname

  const navStyle = {
    background: "url('/img/login/library.webp') center/cover",
    width: '100%',
    position: path === '/' ? 'absolute': 'relative'
  }

  return (
    <nav className="navbar navbar-expand-lg" style={navStyle}  data-bs-theme="dark">
      <div className="container">
        {/* <a className="navbar-brand" href="#">SPK</a> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav gap-3">
            <Link to="/" className={'nav-link fs-5 fw-semibold '+ ((path === '/') && 'active')}>Home</Link>
            <Link to="/criteria" className={'nav-link fs-5 fw-semibold '+ ((path === '/criteria') && 'active')}>Kriteria</Link>
            <Link to="/spk" className={'nav-link fs-5 fw-semibold '+ ((path === '/spk') && 'active')}>SPK</Link>
          </div>
          <div>
            <Link to='/login' onClick={() => localStorage.clear()} className="btn btn-secondary">Keluar</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
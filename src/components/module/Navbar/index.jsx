import { useLocation } from 'react-router-dom'

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
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav gap-3">
            <a className={'nav-link fs-5 fw-semibold '+ ((path === '/') && 'active')} href="/">Home</a>
            <a className={'nav-link fs-5 fw-semibold '+ ((path === '/criteria') && 'active')} href="/criteria">Kriteria</a>
            <a className={'nav-link fs-5 fw-semibold '+ ((path === '/spk') && 'active')} href="/spk">SPK</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "url('/img/login/library.webp') center/cover" }} data-bs-theme="dark">
      <div className="container">
        {/* <a className="navbar-brand" href="#">SPK</a> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav gap-3">
            <a className="nav-link fs-5 fw-semibold active" aria-current="page" href="#">Home</a>
            <a className="nav-link fs-5 fw-semibold" href="#">SPK</a>
            <a className="nav-link fs-5 fw-semibold" href="#">Pengaturan</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
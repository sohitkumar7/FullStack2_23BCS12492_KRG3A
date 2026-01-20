import { Link } from 'react-router-dom'

function Header() {
  return (
    <header style={{ padding: "1rem" }}> 

      <h2>Ecotrack</h2>
      <nav>
        <Link to="/" style={{ marginRight: "1rem", color: "white" }}>
          dashboard
        </Link>
        <Link to="/" style={{ marginRight: "1rem", color: "white" }}>
          logs
        </Link>
        <Link to="/login" style={{ marginRight: "1rem", color: "white" }}>
          Login
        </Link>
      </nav>
    </header>
  )
}

export default Header;


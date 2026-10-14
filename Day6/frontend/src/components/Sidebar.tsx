import { NavLink } from 'react-router'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/issues">Issues</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
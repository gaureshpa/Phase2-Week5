import { NavLink } from 'react-router'
import './Sidebar.css'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { user } = useAuth()

  return (
    <aside className="sidebar">
      <nav>
        {user?.role === 'ADMIN' && (
          <>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/issues">Issues</NavLink>
          </>
        )}  

        {user?.role === 'AGENT' && (
          <>
            <NavLink to="/projects">Projects</NavLink>
          </>
        )}

        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
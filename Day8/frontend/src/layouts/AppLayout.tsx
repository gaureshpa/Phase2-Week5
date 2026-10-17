import { Outlet } from 'react-router'
import Header from '../components/Header'
import '../App.css'
import Sidebar from '../components/Sidebar'

function AppLayout() {
  return (
    <>
      <Header />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AppLayout

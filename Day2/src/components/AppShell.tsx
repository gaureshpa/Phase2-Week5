import Header from './Header'
import Sidebar from './Sidebar'
import { issues, projects } from '../data/mockData'
import ProjectList from './ProjectList'
import IssueList from './IssueList'

function AppShell() {
    return (
        <>
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <main className="dashboard-main">

                    <ProjectList projects={projects} />

                    <IssueList issues={issues} />

                </main>
            </div>
        </>
    )
}

export default AppShell

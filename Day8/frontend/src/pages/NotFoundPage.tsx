import { Link } from "react-router";

function NotFoundPage() {
    return (
        <main>
            <h1>404: Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist</p>
            <Link to="/projects">Back to Project</Link>
        </main>
    )
}

export default NotFoundPage

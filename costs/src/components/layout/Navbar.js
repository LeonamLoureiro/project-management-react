import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/Company">Company</Link>
                <Link to="/Contact">Contact</Link>
                <Link to="/NewProject">New Project</Link>
            </ul>
        </div>
    )
}

export default Navbar
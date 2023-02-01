import styles from './ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({id, name, budget, category, handleRemove}) {
    return (
        <div>
            <h4>{name}</h4>
            <p>
                <span>Budget:</span> ${budget}
            </p>
            <p>
                <span>Category:</span> ${category}
            </p>
            <div>
                <p>Edit</p>
                <p>Remove</p>
            </div>
        </div>
    )
}

export default ProjectCard
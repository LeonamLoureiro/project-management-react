import styles from '../project/ProjectCard.module.css'
import { BsFillTrashFill } from 'react-icons/bs'

function ServiceCard( { id, name, cost, description, handleRemove } ) {
    
    function remove() {

    }
    
    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Total Cost:</span> ${cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Remove
                </button>                
            </div>
        </div>
    )
}

export default ServiceCard
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Project() {
    
    const {id} = useParams()

    const [project, setProject] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}` , {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            console.log(data)
        })
        .catch(err => console.log(err))
    }, [id])
    
    return (
        <div>
            <p>{project.name}</p>
        </div>
    )
}

export default Project
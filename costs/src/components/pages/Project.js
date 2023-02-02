import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

function Project() {
    
    const {id} = useParams()

    const [project, setProject] = useState([])

    const [showProjectForm, setShowProjectForm] = useState(false)

    const [message, setMessage] = useState()

    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
        
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
            }, 300)
        }, [id])
    
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project) {

        if(project.budget < project.cost){
            setMessage("Budget cannot be lower than cost of project!")
            setType("error")
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project),
        } )
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage("Project Updated!")
            setType("success")
        })
        .catch(err => console.log(err))

    }
    
    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} /> }
                        <div className={styles.details_container}>
                            <h1>Project: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? "Edit Project" : "Close"}</button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Category</span> {project.category.name}
                                    </p>
                                    <p>    
                                        <span>Total Budget</span> ${project.budget}
                                    </p>
                                    <p>
                                        <span>Used Budget</span> ${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <p>
                                        <ProjectForm handleSubmit={editPost} btnText="Finish Editing" projectData={project} />
                                    </p>
                                </div>
                            ) }
                        </div>
                    </Container>
                </div>
            ): (
                <Loading />
            )}
        </>
    )
}

export default Project
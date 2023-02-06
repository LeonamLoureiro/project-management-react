import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { parse, v4 as uuidv4 } from 'uuid'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'

function Project() {
    
    const {id} = useParams()

    const [project, setProject] = useState([])

    const [services, setServices] = useState([])

    const [showProjectForm, setShowProjectForm] = useState(false)

    const [showServiceForm, setShowServiceForm] = useState(false)

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
                setServices(data.services)
            })
            .catch(err => console.log(err))
            }, 300)
        }, [id])
    
    function createService(project) {

        setMessage('')
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)) {
            setMessage('Budget blown! Check the cost of the service')
            setType('error')
            project.services.pop()
            return false
        }

        project.costs = newCost

        //update project

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
        .catch(err => console.log(err))

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project) {

        setMessage("")

        if(project.budget < project.costs){
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
                                        <span>Used Budget</span> ${project.costs}
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
                        <div className={styles.service_form_container}>
                            <h2>Add a service:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? "Add Service" : "Close"}</button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm handleSubmit={createService} btnText="Add Service" projectData={project} />
                                )
                                }
                            </div>
                        </div>
                        <h2>Services</h2>
                        <Container customClass="start">
                            {services.length > 0

                            }
                            {services.length === 0 && <p>There are no registered services</p>

                            }
                        </Container>
                    </Container>
                </div>
            ): (
                <Loading />
            )}
        </>
    )
}

export default Project
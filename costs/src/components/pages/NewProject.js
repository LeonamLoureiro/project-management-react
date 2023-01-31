import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'
import { useNavigate } from 'react-router-dom'

function NewProject() {

    const history = useNavigate()

    function createPost(project) {
        //Initialize costs and services
        project.costs = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            history('/projects', {message: "Project Created Successfully"})
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.new_project_container}>
            <h1>Create Project</h1>
            <p>Create your project first and later add services</p>
            <ProjectForm handleSubmit={createPost} btnText="Create Project" />
        </div>
    )
}

export default NewProject
import Input from '../Form/Input'
import Select from '../Form/Select'
import Submit from '../Form/Submit'
import styles from './ProjectForm.module.css'
import { useState, useEffect } from 'react'

function ProjectForm( {handleSubmit, btnText, projectData} ) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => { 
        fetch('http://localhost:5000/categories', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json()).then((data) => {setCategories(data)}).catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value})         
    }

    function handleCategory(e) {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })         
    }

    return (
        <div>
            <form onSubmit={submit} className={styles.form}>
                <Input type="text" text="Name of Project" name="name" placeholder="Insert project name" handleOnChange={handleChange} value={project.name ? project.name : ""} />
                <Input type="number" text="Project Budget" name="budget" placeholder="Insert project total budget" handleOnChange={handleChange} value={project.budget ? project.budget : ""} />
                <Select name="category_id" text="Select a Category" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ""} />                    
                <Submit text={btnText} />
            </form>
        </div>
    )
}

export default ProjectForm
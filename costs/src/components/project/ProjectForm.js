import Input from '../Form/Input'
import Select from '../Form/Select'
import Submit from '../Form/Submit'
import styles from './ProjectForm.module.css'
import { useState, useEffect } from 'react'

function ProjectForm() {

    const [categories, setCategories] = useState([])

    
    fetch('http://localhost:5000/categories', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((resp) => resp.json()).then((data) => {setCategories(data)}).catch((err) => console.log(err))

    return (
        <div>
            <form className={styles.form}>
                <Input type="text" text="Name of Project" name="name" placeholder="Insert project name"/>
                <Input type="number" text="Project Budget" name="budget" placeholder="Insert project total budget"/>
                <Select name="category_id" text="Select a Category" />                    
                <Submit text="Create Project" options={categories}/>
            </form>
        </div>
    )
}

export default ProjectForm
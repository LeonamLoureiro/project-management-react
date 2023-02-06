import styles from '../project/ProjectCard.module.css'
import Input from '../Form/Input'
import Submit from '../Form/Submit'
import { useState } from 'react'

function ServiceForm({handleSubmit, btnText, projectData}) {
   
    const [service, setService] = useState({})

    const submit = (e) => {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }
    
    return (
        <form onSubmit={submit} className={styles.form} > 
            <Input 
                type="text" 
                text="Service Name" 
                name="name" 
                placeholder="Insert Service Name" 
                handleOnChange={handleChange}
            />
             <Input 
                type="number" 
                text="Service Cost" 
                name="cost" 
                placeholder="Insert Total Value" 
                handleOnChange={handleChange}
            />
             <Input 
                type="text" 
                text="Service Description" 
                name="description" 
                placeholder="Describe Service" 
                handleOnChange={handleChange}
            />
            <Submit text={btnText} />
        </form>
    )
}

export default ServiceForm
import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Welcome to <span>Costs Management</span></h1>
            <p>Start To Manage Your Own Projects Right Now!</p>
            <LinkButton to="/newproject" text="Create Project"/>
            <img src={savings} alt="Costs Project" />
        </section>
    )
}

export default Home
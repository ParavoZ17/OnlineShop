import { useNavigate } from 'react-router-dom';
import notfound from '../../assets/images/404.png';
import styles from './NotFoundPage.module.css'


function NotFoundPage (){
    const navigate = useNavigate();
    return (
        <div>
            <img src={notfound} alt="NotFoundPage" />
            <div>
            <h2>Page Not Found</h2>
            <p>We're sorry, the page you requested could not be found.
Please go back to the homepage.</p>
            <button onClick={() => navigate(`/`)} >Go to Main Page</button>
        </div>
        </div>
    )

}

export default NotFoundPage;
 
import './Homepage.css';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

function Homepage(){
    return ( 
        <div>
            <Link to='/login'>
                <h4>Login</h4>
            </Link>
            <Footer />
        </div> 
    );
}

export default Homepage;

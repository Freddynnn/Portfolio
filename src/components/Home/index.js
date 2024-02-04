import { Link} from 'react-router-dom';
import Sidebar from '../Sidebar';
import Logo from './Logo'
import './index.scss'

const Home = () => {
    return (
        <div className='container home-page'>
            <div className='text-zone'>
                <h1> Hi, my name is<br/> Frederick (Freddy)
                <br/> 
                    Noronha-Nehrmann
                </h1>

                <h2>
                Unimelb Graduate - BsC (Computing and Software Systems) 
                </h2>
                <Link to="/contact" className='flat-button'> CONTACT ME </Link>

            </div>

            {/* <div className = 'pfp'>
                <img src={} alt='home'/>
            </div> */}

            {/* <Logo></Logo> */}



        </div>
    );
}   

export default Home;
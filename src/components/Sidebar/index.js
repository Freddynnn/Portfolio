import './index.scss'
import {Link, NavLink} from 'react-router-dom'
import LogoHome from '../../assets/images/logoHome.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => (
    <div className='nav-bar'>
        <Link className='logo' to='/'>
            <div >FN</div>
            
        </Link>
        

        <nav>
            <NavLink exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="about-link" to="/about">
                <FontAwesomeIcon icon={faUser} />
            </NavLink>
            <NavLink exact="true" activeclassname="active"  className="contact-link"  to="/contact">
                <FontAwesomeIcon icon={faEnvelope} />
            </NavLink>
            <NavLink exact="true" activeclassname="active"  className="search-link"  to="/search">
                <FontAwesomeIcon icon={faSearch} />
            </NavLink>
            {/* <NavLink exact="true" activeclassname="active"  className="settings-link"  to="/settings">
                <FontAwesomeIcon icon={faGear} />
            </NavLink> */}
        </nav>

        <ul>
            <li>
                <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/frederick-noronha-nehrmann-aa7b572a7/'>
                    <FontAwesomeIcon icon={faLinkedin} color='#555'/>
                </a>
            </li>
            <li>
                <a target='_blank' rel='noreferrer' href='https://github.com/Freddynnn'>
                    <FontAwesomeIcon icon={faGithub} color='#555'/>
                </a>
            </li>
        </ul>
        

    </div>

)

export default Sidebar;
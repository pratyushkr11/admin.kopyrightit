import Logo from '../../assets/logo2 copy.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

import './Sidenav.css';

const SideNav = () => {
    return (
        <div className="sidenav">
            <div className='top'>
                <img className='logo' src={Logo} alt='brand-logo' />
            </div>
            <hr />
            <div className='center'>
                <ul>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className='nav-icon' />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <Link to='/applications' style={{ textDecoration: 'none' }}>
                        <li>
                            <AssignmentIcon className='nav-icon' />
                            <span>Applications</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className='bottom'>
                <ul>
                    <li>
                        <LogoutIcon className='nav-icon' />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideNav

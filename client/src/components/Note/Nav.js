import {Link} from 'react-router-dom'

const Nav = ({setIsLogin}) => {
    const logoutSubmit = (e) => {
        localStorage.clear();
        setIsLogin(false);
    }
	return (
		<header>
			<div className='logo'>
				<h1>
					<Link to='/'>Simple MERN Notes</Link>
				</h1>
			</div>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/create'>Create Note</Link>
				</li>
				<li>
					<Link to='/' onClick={logoutSubmit}>Logout</Link>
				</li>
			</ul>
		</header>
	);
};

export default Nav

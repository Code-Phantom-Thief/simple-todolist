import Login from './components/Login';
import Notes from './components/Notes';
import { useEffect, useState } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import { baseURL } from './api';
import axios from 'axios';

function App() {
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		const checkLoggedIn = async () => {
			try {
				const token = localStorage.getItem('tokenStore');
				if (token) {
					const verified = await axios({
						method: 'GET',
						withCredentials: true,
						url: `${baseURL}/auth/verify`,
						headers: { Authorization: token },
					});
					setIsLogin(verified.data);

					if (verified.data === false) {
						return localStorage.clear();
					}
				} else {
					setIsLogin(false);
				}
			} catch (error) {}
		};
		checkLoggedIn();
	}, []);

	return (
		<div className='App'>
			{isLogin ? (
				<Notes setIsLogin={setIsLogin} />
			) : (
				<Login setIsLogin={setIsLogin} />
			)}
		</div>
	);
}

export default App;

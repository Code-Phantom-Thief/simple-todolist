import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../api';

const Login = ({ setIsLogin }) => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const [err, setError] = useState('');

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
		setError('');
	};

	const loginSubmit = async (e) => {
		e.preventDefault();
		try {
			const existUser = await axios({
				method: 'POST',
				data: user,
				withCredentials: true,
				url: `${baseURL}/auth/login`,
			});
			setUser({
				email: '',
				password: '',
			});
			localStorage.setItem(
				'tokenStore',
				existUser.data.token
			);
			setError(existUser.data.message);
			setIsLogin(true);
		} catch (error) {
			setError(error.response.data.message);
		}
	};
	
	const registerSubmit = async (e) => {
		e.preventDefault();
		try {
			const newUser = await axios({
				method: 'POST',
				data: user,
				withCredentials: true,
				url: `${baseURL}/auth/register`,
			});
			setUser({
				username: '',
				email: '',
				password: '',
			});
			setError(newUser.data.message);
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	const [onLogin, setOnLogin] = useState(false);
	const style = {
		visibility: onLogin ? "visible" : "hidden",
		opacity: onLogin ? 1: 0
	}

	return (
		<section>
			<div className='login create-note'>
				<h2>Login</h2>
				<form onSubmit={loginSubmit}>
					<input
						type='email'
						name='email'
						placeholder='Enter Email'
						required
						value={user.email}
						onChange={onChangeInput}
					/>
					<input
						type='password'
						name='password'
						placeholder='Enter Password'
						required
						value={user.password}
						onChange={onChangeInput}
						autoComplete='true'
					/>
					<button>Login</button>
					<p>
						You don't have an account?
						<span onClick={() => setOnLogin(true)}>
							Register Now
						</span>
					</p>
					<h3>{err}</h3>
				</form>
			</div>
			<section>
				<div className='register create-note' style={style}>
					<h2>Register</h2>
					<form onSubmit={registerSubmit}>
						<input
							type='text'
							name='username'
							placeholder='Enter Username'
							required
							value={user.username}
							onChange={onChangeInput}
						/>
						<input
							type='email'
							name='email'
							placeholder='Enter Email'
							required
							value={user.email}
							onChange={onChangeInput}
						/>
						<input
							type='password'
							name='password'
							placeholder='Enter Password'
							required
							value={user.password}
							onChange={onChangeInput}
							autoComplete='true'
						/>
						<button>Register</button>
						<p>
							You have an account?
							<span onClick={() => setOnLogin(false)}>
								Login Now
							</span>
						</p>
						<h3>{err}</h3>
					</form>
				</div>
			</section>
		</section>
	);
};

export default Login;

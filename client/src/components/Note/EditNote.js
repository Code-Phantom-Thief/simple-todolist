import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../api';

const EditNote = ({ match }) => {
	let navigate = useNavigate();
	const [note, setNote] = useState({
		title: '',
		content: '',
		date: '',
		id: '',
	});
	const { id } = useParams();

	useEffect(() => {
		const getNote = async () => {
			try {
				const token = localStorage.getItem('tokenStore');
				if (id) {
					const res = await axios({
						method: 'GET',
						withCredentials: true,
						headers: {
							Authorization: token,
						},
						url: `${baseURL}/notes/${id}`,
					});
					setNote({
						title: res.data.note.title,
						content: res.data.note.content,
						date: new Date(
							res.data.note.date
						).toLocaleString(),
						id: res.data.note._id,
					});
				}
			} catch (error) {}
		};
		getNote();
	}, [id]);

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setNote({ ...note, [name]: value });
	};

	const editNote = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('tokenStore');
			if (token) {
				const { title, content, date,id } = note;
				const updateNote = { title, content, date,id };
				await axios({
					method: 'PUT',
					withCredentials: true,
					url: `${baseURL}/notes/${id}`,
					data: updateNote,
					headers: {
						Authorization: token,
					},
				});
				return navigate('/');
			}
		} catch (error) {
			window.location.href = '/';
		}
	};

	return (
		<div className='create-note'>
			<h2>Create Note</h2>
			<form onSubmit={editNote} autoComplete='off'>
				<div className='row'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						required
						value={note.title}
						onChange={onChangeInput}
					/>
				</div>
				<div className='row'>
					<label htmlFor='content'>Content</label>
					<textarea
						type='text'
						name='content'
						required
						value={note.content}
						rows='10'
						onChange={onChangeInput}
					/>
				</div>
				<div className='row'>
					<label htmlFor='date'>Date: {note.date}</label>
					<input
						type='date'
						name='date'
						required
						rows='10'
						onChange={onChangeInput}
					/>
				</div>
				<button>Edit Note</button>
			</form>
		</div>
	);
};

export default EditNote;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../api';
import { format} from 'date-fns';

const Home = () => {
	const [notes, setNotes] = useState([]);
	const [token, setToken] = useState('');

	const getNotes = async (token) => {
		const res = await axios({
			method: 'GET',
			withCredentials: true,
			url: `${baseURL}/notes`,
			headers: { Authorization: token },
		});
		setNotes(res.data.notes);
    };
    
    const deleteNote = async (id) => {
        try {
            await axios({
                method: 'DELETE',
                withCredentials: true,
                url: `${baseURL}/notes/${id}`,
                headers: {
                    Authorization: token
                }
            })
            getNotes(token);
        } catch (error) {
            window.location.href = '/'
        }
	}

	useEffect(() => {
		const token = localStorage.getItem('tokenStore');
		setToken(token);
		if (token) {
			getNotes(token);
		}
	}, []);

	return (
		<div className='note-wrapper'>
			{notes?.map((note) => (
				<div className='card' key={note._id}>
					<h4 title={note.title}>{note.title}</h4>
					<div className='text-wrapper'>
						<p>{note.content}</p>
					</div>
					<p className='date'>
						{format(new Date(note.date), 'dd/MM/yyyy')}
					</p>
					<div className='card-footer'>
						{note.name}
                        <Link to={`/edit/${note._id}`} match={note._id}>Edit</Link>
					</div>
					<button className='close' onClick={() => deleteNote(note._id)}>X</button>
				</div>
			))}
		</div>
	);
};

export default Home;

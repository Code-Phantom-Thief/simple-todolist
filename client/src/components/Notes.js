import Nav from './Note/Nav'
import Home from './Note/Home'
import CreateNote from './Note/CreateNote'
import EditNote from './Note/EditNote'
import {Routes, Route} from 'react-router-dom'

const Notes = ({setIsLogin}) => {
	return (
		<>
			<Nav setIsLogin={setIsLogin} />
			<section className='notes-page'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/create' element={<CreateNote />} />
					<Route path='/edit/:id' element={<EditNote />} />
				</Routes>
			</section>
		</>
	);
};

export default Notes

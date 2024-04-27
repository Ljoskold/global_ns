
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ThankYou from './pages/ThankYou.jsx';
import Home from './pages/Home.jsx';
import './index.css';

function App() {
	return (
	<BrowserRouter>
		<Routes>
			<Route index element={<Home />} />
			<Route path="/Home" element={<Home />} />
			<Route path='/ThankYou' element={<ThankYou />}/>
		</Routes>
	</BrowserRouter>
	)
}

export default App;

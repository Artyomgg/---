// src/App.jsx
import { Route, Routes } from 'react-router'
import './styles/App.css'
import AdminPanel from './components/AdminPanel'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import NewsPage from './pages/NewsPage'
import RegisterPage from './pages/RegisterPage'
import RulesPage from './pages/RulesPage'

function App() {
	return (
		<div className='app'>
			<ScrollToTop />
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/news' element={<NewsPage />} />
				<Route path='/rules' element={<RulesPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/admin' element={<AdminPanel />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App

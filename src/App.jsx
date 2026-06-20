// src/App.jsx
import { Route, Routes } from 'react-router'
import AdminPanel from './components/AdminPanel'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import GalleryPage from './pages/GalleryPage'
import HomePage from './pages/HomePage'
import NewsPage from './pages/NewsPage'
import RulesPage from './pages/RulesPage'
import './styles/App.css'
import NotFoundPage from './components/NotFoundPage'
import AdminRoute from './components/AdminRoute'

function App() {
	return (
		<div className='app'>
			<ScrollToTop />
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/news' element={<NewsPage />} />
				<Route path='/gallery' element={<GalleryPage />} />
				<Route path='/rules' element={<RulesPage />} />
				<Route path="/admin" element={<AdminRoute />} /> {/* Защищённый маршрут */}
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App

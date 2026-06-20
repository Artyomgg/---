// src/components/AdminRoute.jsx
import { useEffect, useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'

function AdminRoute() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const auth = sessionStorage.getItem('adminAuth') === 'true'
		setIsAuthenticated(auth)
		setLoading(false)
	}, [])

	const handleLogin = () => {
		sessionStorage.setItem('adminAuth', 'true')
		setIsAuthenticated(true)
	}

	const handleLogout = () => {
		sessionStorage.removeItem('adminAuth')
		setIsAuthenticated(false)
	}

	if (loading) {
		return <div className='loading-spinner'>Загрузка...</div>
	}

	if (!isAuthenticated) {
		return <AdminLogin onLogin={handleLogin} />
	}

	// Прокидываем функцию логаута в админку (можно добавить кнопку выхода)
	return <AdminPanel onLogout={handleLogout} />
}

export default AdminRoute

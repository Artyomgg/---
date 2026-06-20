// src/components/AdminLogin.jsx
import { useState } from 'react'

function AdminLogin({ onLogin, error: initialError }) {
	const [password, setPassword] = useState('')
	const [error, setError] = useState(initialError || '')

	const handleSubmit = e => {
		e.preventDefault()
		const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
		if (password === correctPassword) {
			setError('')
			onLogin()
		} else {
			setError('Неверный пароль. Попробуйте снова.')
			setPassword('')
		}
	}

	return (
		<div className='admin-login-page'>
			<div className='admin-login-container'>
				<div className='admin-login-header'>
					<img src='/vpk-logo.png' alt='Логотип' className='admin-login-logo' />
					<h1>Вход в админ-панель</h1>
					<p>Введите пароль для доступа к управлению контентом</p>
				</div>
				<form onSubmit={handleSubmit} className='admin-login-form'>
					<div className='admin-login-field'>
						<label htmlFor='password'>Пароль</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder='Введите пароль...'
							autoFocus
							required
						/>
					</div>
					{error && <div className='admin-login-error'>{error}</div>}
					<button type='submit' className='admin-login-btn'>
						Войти
					</button>
				</form>
			</div>
		</div>
	)
}

export default AdminLogin

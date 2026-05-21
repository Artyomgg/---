// src/components/RegisterSection.jsx
import { useState } from 'react'

function RegisterSection() {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		age: '',
		message: '',
	})

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		alert(`Заявка от ${formData.name} принята! Мы свяжемся с вами.`)
		console.log('Данные записи:', formData)
		setFormData({ name: '', phone: '', age: '', message: '' })
	}

	return (
		<div className='section register-section'>
			<h2>Онлайн запись в ВПК "Мужество"</h2>
			<p>Заполните форму, и инструктор свяжется с вами для приглашения на пробное занятие.</p>
			<form onSubmit={handleSubmit} className='reg-form'>
				<input
					type='text'
					name='name'
					placeholder='Ваше полное имя'
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<input
					type='tel'
					name='phone'
					placeholder='Контактный телефон (+375 xx xxx-xx-xx)'
					value={formData.phone}
					onChange={handleChange}
					required
				/>
				<input
					type='number'
					name='age'
					placeholder='Возраст'
					value={formData.age}
					onChange={handleChange}
					required
				/>
				<textarea
					name='message'
					placeholder='Коротко о себе / Опыт'
					rows='3'
					value={formData.message}
					onChange={handleChange}
				/>
				<button type='submit' className='btn-submit'>
					Записаться сейчас
				</button>
			</form>
		</div>
	)
}

export default RegisterSection

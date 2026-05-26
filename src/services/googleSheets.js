// src/services/googleSheets.js

const API_URL =
	'https://script.google.com/macros/s/AKfycbwhP6XqFfTFtbmbD5uBAklLHTd5jlPTaIsQHifU8YxE04epCdlW7qhYHUciWjV7DcmSbQ/exec'

const getUrl = () => `${API_URL}?_=${Date.now()}`

// Получение новостей (новые первыми)
export const fetchNews = async () => {
	try {
		const response = await fetch(getUrl())
		if (!response.ok) throw new Error('Ошибка загрузки')
		const data = await response.json()
		// РАЗВОРАЧИВАЕМ МАССИВ — последние новости в таблице будут первыми на сайте
		return (data.news || []).reverse()
	} catch (error) {
		console.error('Ошибка загрузки новостей:', error)
		return []
	}
}

// Получение галереи (новые фото первыми)
export const fetchGallery = async () => {
	try {
		const response = await fetch(getUrl())
		if (!response.ok) throw new Error('Ошибка загрузки')
		const data = await response.json()
		// РАЗВОРАЧИВАЕМ МАССИВ — последние фото в таблице будут первыми на сайте
		return (data.gallery || []).reverse()
	} catch (error) {
		console.error('Ошибка загрузки галереи:', error)
		return []
	}
}

// Текст о клубе (порядок не важен)
export const fetchAboutText = async () => {
	try {
		const response = await fetch(getUrl())
		if (!response.ok) throw new Error('Ошибка загрузки')
		const data = await response.json()
		return data.about || {}
	} catch (error) {
		console.error('Ошибка загрузки текста:', error)
		return {}
	}
}

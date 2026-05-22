// src/services/googleSheets.js
// Подключение к Google Apps Script

const API_URL =
	'https://script.google.com/macros/s/AKfycbwhP6XqFfTFtbmbD5uBAklLHTd5jlPTaIsQHifU8YxE04epCdlW7qhYHUciWjV7DcmSbQ/exec'

// Добавляем параметр кэша для принудительного обновления
const getUrl = () => `${API_URL}?_=${Date.now()}`

// Получение новостей
export const fetchNews = async () => {
	try {
		const response = await fetch(getUrl())
		if (!response.ok) throw new Error('Ошибка загрузки')
		const data = await response.json()
		return data.news || []
	} catch (error) {
		console.error('Ошибка загрузки новостей:', error)
		return []
	}
}

// Получение галереи
export const fetchGallery = async () => {
	try {
		const response = await fetch(getUrl())
		if (!response.ok) throw new Error('Ошибка загрузки')
		const data = await response.json()
		return data.gallery || []
	} catch (error) {
		console.error('Ошибка загрузки галереи:', error)
		return []
	}
}

// Получение текста о клубе
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

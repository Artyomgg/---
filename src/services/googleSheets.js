// src/services/googleSheets.js

// ТВОЯ CSV-ССЫЛКА (уже опубликована)
const CSV_URL =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vSXf3TYkIOus4bsJShSA3W9ZmL3tcGfCUAuVQMYuFfH_jk7F5wSdqXvmaIcTANyiRWKmcKgQUyoveej/pub?output=csv'

// Добавляем параметр кэша, чтобы данные обновлялись
const getUrlWithCache = () => `${CSV_URL}&cache=${Date.now()}`

// Функция для получения CSV текста
const fetchCSV = async () => {
	try {
		const response = await fetch(getUrlWithCache())
		if (!response.ok) throw new Error('Ошибка загрузки')
		const csvText = await response.text()
		return csvText
	} catch (error) {
		console.error('Ошибка загрузки CSV:', error)
		return ''
	}
}

// Парсим CSV в массив объектов
const parseCSV = csvText => {
	if (!csvText) return []

	const lines = csvText.split('\n')
	if (lines.length < 2) return []

	const headers = lines[0].split(',').map(h => h.replace(/["']/g, '').trim())
	const result = []

	for (let i = 1; i < lines.length; i++) {
		if (!lines[i].trim()) continue

		let values = []
		let inQuote = false
		let currentValue = ''

		for (let char of lines[i]) {
			if (char === '"') {
				inQuote = !inQuote
			} else if (char === ',' && !inQuote) {
				values.push(currentValue.trim())
				currentValue = ''
			} else {
				currentValue += char
			}
		}
		values.push(currentValue.trim())
		values = values.map(v => v.replace(/^["']|["']$/g, ''))

		const obj = {}
		headers.forEach((header, idx) => {
			obj[header] = values[idx] || ''
		})

		if (obj.id || obj.title) {
			result.push(obj)
		}
	}
	return result
}

// Функции для разных типов данных
export const fetchNews = async () => {
	const csv = await fetchCSV()
	const allData = parseCSV(csv)
	return allData.filter(row => row.title && row.desc)
}

export const fetchGallery = async () => {
	const csv = await fetchCSV()
	const allData = parseCSV(csv)
	return allData.filter(row => row.src && row.title)
}

export const fetchAboutText = async () => {
	const csv = await fetchCSV()
	const allData = parseCSV(csv)
	const result = {}
	allData.forEach(row => {
		if (row.section && row.content) {
			result[row.section] = row.content
		}
	})
	return result
}

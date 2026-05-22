// src/components/AdminPanel.jsx
import { useEffect, useState } from 'react'
import { fetchAboutText, fetchGallery, fetchNews } from '../services/googleSheets'

function AdminPanel() {
	const [news, setNews] = useState([])
	const [gallery, setGallery] = useState([])
	const [aboutText, setAboutText] = useState({})
	const [loading, setLoading] = useState(true)
	const [activeTab, setActiveTab] = useState('news')
	const [lastUpdate, setLastUpdate] = useState(null)

	const loadData = async () => {
		setLoading(true)
		const [newsData, galleryData, aboutData] = await Promise.all([
			fetchNews(),
			fetchGallery(),
			fetchAboutText(),
		])
		setNews(newsData)
		setGallery(galleryData)
		setAboutText(aboutData)
		setLastUpdate(new Date().toLocaleTimeString())
		setLoading(false)
	}

	useEffect(() => {
		loadData()
	}, [])

	if (loading) {
		return (
			<div className='admin-loading'>
				<div className='spinner'></div>
				<p>Загрузка данных...</p>
			</div>
		)
	}

	return (
		<div className='admin-panel'>
			<div className='container'>
				<h1>📋 Панель управления</h1>

				<div className='admin-info'>
					<p>
						📊 <strong>Google Таблица:</strong>{' '}
						<a
							href='https://docs.google.com/spreadsheets/d/15PaMzlftCVNP3OkxxOcEZ5u1B2AhLIMpYudf6eYFbuo/edit'
							target='_blank'
						>
							Открыть таблицу
						</a>
					</p>
					<p>🕐 Обновлено: {lastUpdate}</p>
					<button onClick={loadData} className='refresh-btn'>
						⟳ Обновить
					</button>
				</div>

				<div className='admin-tabs'>
					<button
						className={activeTab === 'news' ? 'active' : ''}
						onClick={() => setActiveTab('news')}
					>
						📰 Новости ({news.length})
					</button>
					<button
						className={activeTab === 'gallery' ? 'active' : ''}
						onClick={() => setActiveTab('gallery')}
					>
						🖼️ Галерея ({gallery.length})
					</button>
					<button
						className={activeTab === 'about' ? 'active' : ''}
						onClick={() => setActiveTab('about')}
					>
						📝 О клубе
					</button>
				</div>

				{activeTab === 'news' && (
					<div className='admin-section'>
						<h2>Новости</h2>
						{news.length === 0 ? (
							<p>Новостей пока нет. Добавьте в таблицу на лист "news"</p>
						) : (
							<div className='admin-list'>
								{news.map(item => (
									<div key={item.id} className='admin-item'>
										<h3>{item.title}</h3>
										<p className='date'>{item.date}</p>
										<p>{item.desc}</p>
										{item.imageUrl && <img src={item.imageUrl} alt='' width='100' />}
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{activeTab === 'gallery' && (
					<div className='admin-section'>
						<h2>Галерея</h2>
						{gallery.length === 0 ? (
							<p>Фото пока нет</p>
						) : (
							<div className='admin-gallery-preview'>
								{gallery.map(item => (
									<div key={item.id} className='admin-gallery-item'>
										<img src={item.src} alt={item.title} />
										<p>{item.title}</p>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{activeTab === 'about' && (
					<div className='admin-section'>
						<h2>Текст "О клубе"</h2>
						<p>
							<strong>Основной текст:</strong> {aboutText.main_text || 'Не заполнено'}
						</p>
						<p>
							<strong>Требования:</strong> {aboutText.requirements || 'Не заполнено'}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default AdminPanel

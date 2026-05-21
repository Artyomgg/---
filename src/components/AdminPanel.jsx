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

	useEffect(() => {
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
		loadData()
	}, [])

	const handleRefresh = async () => {
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

	if (loading) {
		return (
			<div className='admin-loading'>
				<div className='spinner'></div>
				<p>Загрузка данных из Google Таблицы...</p>
			</div>
		)
	}

	return (
		<div className='admin-panel'>
			<div className='container'>
				<h1>📋 Панель управления контентом</h1>

				<div className='admin-info'>
					<p>
						📊 <strong>Google Таблица для редактирования:</strong>{' '}
						<a
							href='https://docs.google.com/spreadsheets/d/15PaMzlftCVNP3OkxxOcEZ5u1B2AhLIMpYudf6eYFbuo/edit?usp=sharing'
							target='_blank'
							rel='noreferrer'
						>
							Открыть таблицу
						</a>
					</p>
					<p>🕐 Последнее обновление: {lastUpdate}</p>
					<button onClick={handleRefresh} className='refresh-btn'>
						⟳ Обновить данные
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
					<button
						className={activeTab === 'help' ? 'active' : ''}
						onClick={() => setActiveTab('help')}
					>
						❓ Инструкция
					</button>
				</div>

				{activeTab === 'news' && (
					<div className='admin-section'>
						<h2>Новости</h2>
						{news.length === 0 ? (
							<p>Новостей пока нет. Добавьте их в Google Таблицу на лист "news"</p>
						) : (
							<div className='admin-list'>
								{news.map(item => (
									<div key={item.id} className='admin-item'>
										<h3>{item.title}</h3>
										<p className='date'>{item.date}</p>
										<p>{item.desc}</p>
										{item.imageUrl && <img src={item.imageUrl} alt={item.title} width='100' />}
									</div>
								))}
							</div>
						)}
						<div className='admin-add-info'>
							<h4>➕ Как добавить новость:</h4>
							<ol>
								<li>
									Открой{' '}
									<a
										href='https://docs.google.com/spreadsheets/d/15PaMzlftCVNP3OkxxOcEZ5u1B2AhLIMpYudf6eYFbuo/edit?usp=sharing'
										target='_blank'
									>
										таблицу
									</a>
								</li>
								<li>
									Перейди на лист <strong>news</strong>
								</li>
								<li>Добавь новую строку: id, title, date, desc, imageUrl</li>
								<li>
									Нажми <strong>Обновить данные</strong> на этой странице
								</li>
							</ol>
						</div>
					</div>
				)}

				{activeTab === 'gallery' && (
					<div className='admin-section'>
						<h2>Галерея</h2>
						{gallery.length === 0 ? (
							<p>Фото пока нет. Добавьте их в Google Таблицу на лист "gallery"</p>
						) : (
							<div className='admin-gallery-preview'>
								{gallery.map(item => (
									<div key={item.id} className='admin-gallery-item'>
										<img src={item.src} alt={item.title} />
										<p>{item.title}</p>
										<span className='category'>{item.category}</span>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{activeTab === 'about' && (
					<div className='admin-section'>
						<h2>Текст "О клубе"</h2>
						<div className='admin-about'>
							<h3>Основной текст</h3>
							<p>
								{aboutText.main_text ||
									'❌ Не заполнено. Добавьте строку с section="main_text" в лист about_text'}
							</p>
							<h3>Требования</h3>
							<p>
								{aboutText.requirements ||
									'❌ Не заполнено. Добавьте строку с section="requirements"'}
							</p>
						</div>
					</div>
				)}

				{activeTab === 'help' && (
					<div className='admin-section'>
						<h2>📖 Инструкция по управлению сайтом</h2>
						<div className='help-content'>
							<h3>📊 1. Как редактировать контент?</h3>
							<p>
								Открой{' '}
								<a
									href='https://docs.google.com/spreadsheets/d/15PaMzlftCVNP3OkxxOcEZ5u1B2AhLIMpYudf6eYFbuo/edit?usp=sharing'
									target='_blank'
								>
									Google Таблицу
								</a>{' '}
								и редактируй:
							</p>
							<ul>
								<li>
									<strong>Лист "news"</strong> — новости (колонки: id, title, date, desc, imageUrl)
								</li>
								<li>
									<strong>Лист "gallery"</strong> — фото галереи (колонки: id, src, title, category)
								</li>
								<li>
									<strong>Лист "about_text"</strong> — текстовые блоки (колонки: section, content)
								</li>
							</ul>

							<h3>🖼️ 2. Как добавить фото из Google Диска?</h3>
							<ol>
								<li>
									Загрузи фото в{' '}
									<a href='https://drive.google.com' target='_blank'>
										Google Диск
									</a>
								</li>
								<li>
									Открой доступ: правой кнопкой → <strong>"Поделиться"</strong> →{' '}
									<strong>"Все, у кого есть ссылка"</strong>
								</li>
								<li>Скопируй ссылку и найди ID файла (строка между /d/ и /view)</li>
								<li>
									Составь прямую ссылку:{' '}
									<code>https://drive.google.com/uc?export=view&amp;id=ТВОЙ_ID</code>
								</li>
								<li>
									Вставь эту ссылку в колонку <strong>imageUrl</strong> (новости) или{' '}
									<strong>src</strong> (галерея)
								</li>
							</ol>

							<h3>🏷️ 3. Категории для галереи</h3>
							<p>
								Используй: training, shooting, simulators, drones, competitions, ceremony, camp,
								field
							</p>

							<h3>🔄 4. Как обновить сайт?</h3>
							<p>
								Нажми кнопку <strong>⟳ Обновить данные</strong> на этой странице.
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default AdminPanel

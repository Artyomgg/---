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
							rel='noreferrer'
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

				{activeTab === 'help' && (
					<div className='admin-section'>
						<h2>📖 Инструкция по управлению сайтом</h2>
						<div className='help-content'>
							<h3>1. Как редактировать контент?</h3>
							<p>
								Всё редактируется через <strong>Google Таблицу</strong> (ссылка выше).
							</p>
							<ul>
								<li>
									<strong>Лист "news"</strong> — новости. Колонки:{' '}
									<code>id, title, date, desc, imageUrl</code>.
								</li>
								<li>
									<strong>Лист "gallery"</strong> — фотогалерея. Колонки:{' '}
									<code>id, src, title, category</code>.
								</li>
								<li>
									<strong>Лист "about_text"</strong> — текстовые блоки. Колонки:{' '}
									<code>section, content</code>.
								</li>
							</ul>

							<h3>2. Как добавить новость?</h3>
							<ol>
								<li>
									Открой лист <strong>news</strong> в таблице.
								</li>
								<li>Добавь новую строку.</li>
								<li>
									Заполни: <code>id</code> (по порядку), <code>title</code> (заголовок),{' '}
									<code>date</code> (дата), <code>desc</code> (текст), <code>imageUrl</code> (ссылка
									на фото – необязательно).
								</li>
								<li>
									Нажми <strong>⟳ Обновить</strong> на этой странице.
								</li>
							</ol>

							<h3>3. Как добавить фото в галерею?</h3>
							<ol>
								<li>
									Загрузи фото в <strong>Google Диск</strong> и открой доступ "Все, у кого есть
									ссылка".
								</li>
								<li>
									Скопируй <strong>ID файла</strong> (часть ссылки между <code>/d/</code> и{' '}
									<code>/view</code>).
								</li>
								<li>
									Составь прямую ссылку:{' '}
									<code>https://drive.google.com/uc?export=view&amp;id=ТВОЙ_ID</code>.
								</li>
								<li>
									Или используй <strong>ImgBB</strong> – загрузи фото, скопируй "Direct link".
								</li>
								<li>
									Вставь эту ссылку в колонку <code>src</code> на листе <strong>gallery</strong>.
								</li>
								<li>
									Укажи <code>title</code> (подпись) и <code>category</code> (например,{' '}
									<code>training</code>, <code>shooting</code>).
								</li>
								<li>
									Нажми <strong>⟳ Обновить</strong>.
								</li>
							</ol>

							<h3>4. Как изменить текст "О клубе"?</h3>
							<ol>
								<li>
									На листе <strong>about_text</strong> найди строки с <code>main_text</code> и{' '}
									<code>requirements</code>.
								</li>
								<li>
									Измени текст в колонке <code>content</code>.
								</li>
								<li>
									Нажми <strong>⟳ Обновить</strong>.
								</li>
							</ol>

							<h3>5. Как обновить сайт после изменений?</h3>
							<p>
								Нажми кнопку <strong>⟳ Обновить</strong> на этой странице – данные подгрузятся
								заново. Обычно изменения видны сразу.
							</p>

							<h3>⚠️ Важно</h3>
							<ul>
								<li>Не удаляй и не меняй заголовки колонок (первая строка).</li>
								<li>
									Для фото используй только <strong>прямые ссылки</strong> (заканчиваются на{' '}
									<code>.jpg</code>, <code>.png</code> или содержат <code>uc?export=view</code>).
								</li>
								<li>
									Если фото не отображается – проверь доступ к файлу (для Google Диска – "Все, у
									кого есть ссылка").
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default AdminPanel

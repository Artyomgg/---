// src/components/Gallery.jsx
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fetchGallery } from '../services/googleSheets'

function Gallery() {
	const [selectedImage, setSelectedImage] = useState(null)
	const [filter, setFilter] = useState('all')
	const [galleryImages, setGalleryImages] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadGallery = async () => {
			const data = await fetchGallery()
			setGalleryImages(data)
			setLoading(false)
		}
		loadGallery()
	}, [])

	const categories = [
		{ id: 'all', name: 'Все' },
		{ id: 'training', name: 'Тренировки' },
		{ id: 'shooting', name: 'Стрельба' },
		{ id: 'simulators', name: 'Тренажёры' },
		{ id: 'drones', name: 'БПЛА' },
		{ id: 'competitions', name: 'Соревнования' },
		{ id: 'ceremony', name: 'Мероприятия' },
		{ id: 'camp', name: 'Лагерь' },
		{ id: 'field', name: 'Полевые выходы' },
	]

	const filteredImages =
		filter === 'all' ? galleryImages : galleryImages.filter(img => img.category === filter)

	if (loading) {
		return (
			<div className='gallery-section'>
				<div className='container'>
					<div className='loading-spinner'>Загрузка галереи...</div>
				</div>
			</div>
		)
	}

	return (
		<div className='gallery-section'>
			<div className='container'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className='gallery-header'
				>
					<h2>Фотогалерея</h2>
					<p>Моменты из жизни нашего клуба</p>
				</motion.div>

				<div className='gallery-filters'>
					{categories.map(cat => (
						<button
							key={cat.id}
							className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
							onClick={() => setFilter(cat.id)}
						>
							{cat.name}
						</button>
					))}
				</div>

				{filteredImages.length === 0 ? (
					<p className='no-images'>Фото в этой категории пока нет</p>
				) : (
					<div className='gallery-grid'>
						{filteredImages.map((image, index) => (
							<motion.div
								key={image.id}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								viewport={{ once: true }}
								className='gallery-item'
								onClick={() => setSelectedImage(image)}
							>
								<img src={image.src} alt={image.title} />
								<div className='gallery-overlay'>
									<span className='gallery-title'>{image.title}</span>
									<span className='gallery-icon'>🔍</span>
								</div>
							</motion.div>
						))}
					</div>
				)}
			</div>

			{/* Модальное окно */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='gallery-modal'
						onClick={() => setSelectedImage(null)}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className='modal-content'
							onClick={e => e.stopPropagation()}
						>
							<button className='modal-close' onClick={() => setSelectedImage(null)}>
								✕
							</button>
							<img src={selectedImage.src} alt={selectedImage.title} />
							<h3>{selectedImage.title}</h3>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Gallery

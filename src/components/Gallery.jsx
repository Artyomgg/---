// src/components/Gallery.jsx
import { useEffect, useState } from 'react'
import { fetchGallery } from '../services/googleSheets'

function Gallery() {
	const [images, setImages] = useState([])
	const [loading, setLoading] = useState(true)
	const [selected, setSelected] = useState(null)

	useEffect(() => {
		const load = async () => {
			const data = await fetchGallery()
			setImages(data)
			setLoading(false)
		}
		load()
	}, [])

	if (loading) return <div className='loading-spinner'>Загрузка галереи...</div>
	if (images.length === 0) return null

	return (
		<div className='gallery-section'>
			<div className='container'>
				<h2>Фотогалерея</h2>
				<div className='gallery-grid'>
					{images.map(img => (
						<div key={img.id} className='gallery-item' onClick={() => setSelected(img)}>
							<img src={img.src} alt={img.title} />
							<div className='gallery-overlay'>
								<span>{img.title}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{selected && (
				<div className='gallery-modal' onClick={() => setSelected(null)}>
					<div className='modal-content' onClick={e => e.stopPropagation()}>
						<button className='modal-close' onClick={() => setSelected(null)}>
							✕
						</button>
						<img src={selected.src} alt={selected.title} />
						<h3>{selected.title}</h3>
					</div>
				</div>
			)}
		</div>
	)
}

export default Gallery

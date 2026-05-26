// src/components/Footer.jsx
import { contacts } from '../data/clubData'

function Footer() {
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer-grid'>
					<div className='footer-col'>
						<h4>📞 Контакты</h4>
						<p>
							<a href={`tel:${String(contacts.phone || '').replace(/\s/g, '')}`}>
								{contacts.phone}
							</a>
						</p>
						<p>
							<a href={`mailto:${contacts.email}`}>{contacts.email}</a>
						</p>
						<p>{contacts.address}</p>
					</div>
					<div className='footer-col'>
						<h4>📱 Соцсети</h4>
						<div className='social-links'>
							<a href='https://t.me/shool30_info' target='_blank' rel='noreferrer'>
								Telegram
							</a>
							{/* <a href='https://www.instagram.com/your_instagram' target='_blank' rel='noreferrer'>
								Instagram
							</a> */}
						</div>
					</div>
					<div className='footer-col'>
						<h4>⏰ Режим работы</h4>
						<p>{contacts.schedule}</p>
					</div>
				</div>
				<div className='copyright'>
					© {new Date().getFullYear()} Военно-патриотический клуб "Мужество" (Октябрьский район,
					Минск). Все права защищены.
				</div>
			</div>
		</footer>
	)
}

export default Footer

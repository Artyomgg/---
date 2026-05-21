// src/components/Footer.jsx
import { contacts } from '../data/clubData'

function Footer() {
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer-grid'>
					<div>
						<h4>Контакты</h4>
						<p>📞 {contacts.phone}</p>
						<p>✉️ {contacts.email}</p>
						<p>📍 {contacts.address}</p>
					</div>
					<div>
						<h4>Соцсети</h4>
						<p>{contacts.socials}</p>
					</div>
					<div>
						<h4>Режим работы</h4>
						<p>{contacts.schedule}</p>
					</div>
				</div>
				<div className='copyright'>
					© 2026 Военно-патриотический клуб "Мужество" (Октябрьский район, Минск). Все права
					защищены.
				</div>
			</div>
		</footer>
	)
}

export default Footer

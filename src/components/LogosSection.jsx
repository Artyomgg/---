// src/components/LogosSection.jsx
import { logos } from '../data/clubData'

function LogosSection() {
	return (
		<div className='logos-section'>
			<div className='container'>
				<h2>Наши партнёры и основатели</h2>
				<div className='logos-grid'>
					<div className='logo-card'>
						<img src={logos.club} alt='Логотип ВПК Мужество' />
						<p>
							Военно-патриотический клуб
							<br />
							<strong>«Мужество»</strong>
						</p>
					</div>
					<div className='logo-card'>
						<img src={logos.school} alt='Логотип СШ №30 г.Минска' />
						<p>
							ГУО «Средняя школа №30
							<br />
							г.Минска»
						</p>
					</div>
					<div className='logo-card'>
						<img src={logos.army} alt='Логотип в/ч 19310' />
						<p>
							742 полевой узел связи
							<br />
							<strong>в/ч 19310</strong>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LogosSection

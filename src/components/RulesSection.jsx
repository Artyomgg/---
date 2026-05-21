// src/components/RulesSection.jsx
import { documents } from '../data/clubData'

function RulesSection() {
	return (
		<div className='section rules-section'>
			<h2>Правила приема и документы</h2>
			<div className='rules-block'>
				<h3>Требования к кандидату:</h3>
				<ul>
					<li>Возраст: от 10 до 17 лет.</li>
					<li>Медицинская справка об отсутствии противопоказаний.</li>
					<li>Согласие родителей.</li>
				</ul>
				<h3>Официальные положения:</h3>
				<ul className='doc-list'>
					{documents.map((doc, idx) => (
						<li key={idx}>
							<a href={doc.link} target='_blank' rel='noreferrer'>
								📄 {doc.name}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default RulesSection

// src/components/EventsAndAchievements.jsx

function EventsAndAchievements() {
	const events = [
		'Празднование годовщин военно-патриотических клубов: «Гранит», «Отвага» и «Орлята. Наследники Победы»',
		'Экскурсии на Дни открытых дверей: 742 ПУС ССО, в/ч 2007 ПВ, МГКУ, МнСВУ, ВФ БГАА, ВФ БГУ, в/ч 3214, в/ч 89417, ОМОН Минской области',
	]

	const memorialDates = [
		{ date: '13 сентября - ', name: 'День памяти жертвам фашизма' },
		{ date: '15 февраля - ', name: 'День вывода советских войск из ДРА' },
		{ date: '4 марта - ', name: 'День белорусской милиции' },
		{ date: '26 апреля - ', name: 'Авария на ЧАЭС' },
		{ date: '9 мая - ', name: 'День Победы' },
		{ date: '28 мая - ', name: 'День пограничника' },
	]

	const achievements = [
		'Участие в спортивно-патриотических лагерях при воинских частях — летний ВПЛ «Патриот» при в/ч 19310',
		'Участие в спортивно-патриотических и военно-патриотических играх «Зарничка», «Зарница»',
		'Посещение мест геноцида белорусского народа: мемориальный комплекс «Яма», концлагерь «Тростинец»',
	]

	return (
		<div className='events-achievements'>
			<div className='container'>
				<h2>Мероприятия и достижения</h2>

				<div className='events-grid'>
					<div className='event-card'>
						<h3>🎖️ Участие в мероприятиях</h3>
						<ul>
							{events.map((event, idx) => (
								<li key={idx}>{event}</li>
							))}
						</ul>
					</div>

					<div className='event-card'>
						<h3>📅 Дни воинской славы и памяти</h3>
						<div className='dates-grid'>
							{memorialDates.map((item, idx) => (
								<div key={idx} className='date-item'>
									<span className='date'>{item.date}</span>
									<span className='event-name'>{item.name}</span>
								</div>
							))}
						</div>
					</div>

					<div className='event-card'>
						<h3>🏆 Достижения и активность</h3>
						<ul>
							{achievements.map((ach, idx) => (
								<li key={idx}>{ach}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventsAndAchievements

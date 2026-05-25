// src/components/TrainingProgram.jsx
import { useState } from 'react'

function TrainingProgram() {
	const [activeBase, setActiveBase] = useState('school30')

	const bases = {
		school30: {
			name: 'СШ №30 г.Минска (базовая)',
			logo: '/img/IMG-5fb2e8a42027544bb94ff29c6d392cab-V.jpg',
			items: [
				'Неполная разборка и сборка автомата АК-74',
				'Тактическая подготовка',
				'Основы военного дела',
				'Строевая подготовка',
			],
		},
		pus742: {
			name: '742 полевой узел связи (в/ч 19310) — по четвергам',
			logo: '/img/пус-742.png',
			items: [
				'Неполная разборка и сборка автомата АК-74',
				'Снаряжение магазина учебными патронами и его разрядка',
				'Устройство ручных осколочных гранат',
				'Изготовка к бою',
				'Устройство и укладка людских десантных парашютов',
				'Подготовка к работе переносных радиостанций, передача и приём зашифрованного текста',
				'Работа на коммутаторе и на телефоне ТАИ-57',
				'Ознакомление с порядком развёртывания спутниковой станции связи',
				'Военная топография: ориентирование на местности по карте и без карты',
				'Приёмы оказания первой медицинской помощи',
				'Ознакомление с экипировкой разведчика и коллиматорными прицелами',
				'Ознакомление с работой беспилотных летательных аппаратов',
				'Строевая подготовка',
			],
		},
		vch3214: {
			name: 'в/ч 3214',
			logo: '/img/вч3214.png',
			items: [
				'Стрельба в интерактивном тире',
				'Неполная разборка и сборка АК-74',
				'Снаряжение магазина учебными патронами',
			],
		},
		bgaa: {
			name: 'БГАА',
			logo: '/img/БГАА.png',
			items: [
				'Стрельба в интерактивном тире',
				'Ознакомление с БПЛА',
				'Тренировки на тренажёрах по управлению БПЛА',
				'Тренировки на тренажёрах по вождению машин',
				'Ознакомление со стрелковым оружием и гранатомётами',
			],
		},
		vch06752: {
			name: 'в/ч 06752',
			logo: '/img/ВОЗДУШНЫЕ СИЛЫ РБ.png',
			items: ['Тренировки на тренажёре вертолёта Ми-8Т'],
		},
		omon: {
			name: 'ОМОН Минской области',
			logo: '/img/ОМОН.png',
			items: ['Работа на тренажёрах по общей физической подготовке'],
		},
	}

	return (
		<div className='training-program'>
			<div className='container'>
				<h2>Программа обучения и базы подготовки</h2>
				<p className='program-intro'>
					ВПК «Мужество» проводит занятия на нескольких базах, каждая из которых даёт уникальные
					навыки:
				</p>

				<div className='bases-tabs'>
					{Object.keys(bases).map(key => (
						<button
							key={key}
							className={`base-tab ${activeBase === key ? 'active' : ''}`}
							onClick={() => setActiveBase(key)}
						>
							<img src={bases[key].logo} alt={bases[key].name} className='base-logo' />
							{bases[key].name.split(' ')[0]} {bases[key].name.split(' ')[1]}
						</button>
					))}
				</div>

				<div className='base-content'>
					<div className='base-header'>
						<img
							src={bases[activeBase].logo}
							alt={bases[activeBase].name}
							className='base-logo-large'
						/>
						<h3>{bases[activeBase].name}</h3>
					</div>
					<ul className='base-list'>
						{bases[activeBase].items.map((item, idx) => (
							<li key={idx}>{item}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default TrainingProgram

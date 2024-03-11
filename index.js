// импортируем функцию
import { buildContextFromXml } from './xmlParser/parser.js';
import { openNewMap, addPolygonToMap } from './library/map.js';
import { writeErrorToConsole } from './helpers/logger.js';

window.onload = () => {
	navigator.geolocation.getCurrentPosition(success, writeErrorToConsole, {
		enableHighAccuracy: true,
	});
};

// находим кнопку и добавляем к ней обработчик
document.getElementById('add_poly').onclick = async function () {
	//buildContextFromXml('forestReforestationSample.xml');
	this.disabled = true;
	const loader = document.querySelector('#loader');
	loader.textContent = '';
	loader.classList.toggle('loader');

	const polygonData = await buildContextFromXml('forestReforestationSample.xml');
	addPolygonToMap(polygonData);

	// Через 1 сек запускаем функцию переключения лоадера на текст
	setTimeout(() => {
		loader.classList.toggle('loader');
		this.disabled = false;
		loader.textContent = 'Добавить полигон';
	}, 1000);
};

const success = ({ coords }) => {
	const { latitude, longitude } = coords;
	const currentPosition = [latitude, longitude];
	//console.log(currentPosition, 'get current position');
	// после загрузки документа открываем новую карту, передавая ей текущую позицию
	openNewMap(currentPosition);
};

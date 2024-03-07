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
document.getElementById('add_poly').onclick = async () => {
	//buildContextFromXml('forestReforestationSample.xml');
	const polygonData = await buildContextFromXml('forestReforestationSample.xml');
	addPolygonToMap(polygonData);
};

const success = ({ coords }) => {
	const { latitude, longitude } = coords;
	const currentPosition = [latitude, longitude];
	console.log(currentPosition, 'get current position');
	// после загрузки документа открываем новую карту, передавая ей текущую позицию
	openNewMap(currentPosition);
};

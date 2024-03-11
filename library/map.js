// создаем локальные переменные для карты и слоя данных для добавления объектов
// каждый модуль имеет собственное пространство имен
let map = null;
let featureGroup = null;

// функция принимает позицию - массив с широтой и долготой
// и сообщение, отображаемое над маркером (tooltip)
export const openNewMap = (position) => {
	// если карта не была инициализирована
	if (map === null) {
		// второй аргумент, принимаемый методом setView - это масштаб (zoom)
		map = L.map('map').setView(position, 15);
	} else return;

	// что-то типа рекламы
	// без этого карта работать не будет
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	featureGroup = new L.FeatureGroup();
	featureGroup.addTo(map);
};

export const addPolygonToMap = (polygonData) => {
	const { id, date, points } = polygonData;

	const bounds = L.latLngBounds();

	// Удаляем все подсказки и полигоны слоя featureGroup для повторной загрузки
	featureGroup.clearLayers();

	const polygonOptions = {
		color: 'red',
		weight: 2,
		fillColor: '#f188a0',
		fillOpacity: 0.6,
	};

	const customToolTip = `<div style='text-align: center; margin-bottom: 5px; font-size: 1.25em'><b>Подсказка</b></div>Номер объекта: <b>${id}</b><br />Дата объекта: <b>${date}</b>`;

	const polygonPoints = points.map((point, index) => {
		//new L.Marker([point.lat, point.lon]).addTo(map).bindPopup(`Точка ${index+1}`);
		return [point.lat, point.lon]}
		);
	bounds.extend(polygonPoints);

	// добавляем полигон с сообщением на слой feature
	const polygon = new L.polygon(polygonPoints, polygonOptions);

	polygon.bindPopup(customToolTip);

	featureGroup.addLayer(polygon);

	// Приближаемся к экстенту полигона
	map.fitBounds(bounds);

	polygon.openPopup();
};


//import { xml2json } from '../node_modules/xml-js/lib/index.js';
//import { readFileSync } from 'fs';
//import { removeNSFromElementName, valueFromTextAttribute } from '../helpers/helpers.js';
import { writeErrorToConsole } from '../helpers/logger.js';

const loadXmlContent = async (xmlFilePath) =>
	new Promise((resolve, reject) => {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = (evt) => {
			if (evt.currentTarget.readyState === 4 && evt.currentTarget.status === 200) {
				try {
					const responseText = evt.currentTarget.responseText;
					const parser = new DOMParser();
					const xmlDoc = parser.parseFromString(responseText, 'application/xhtml+xml');
					console.log('response data', xmlDoc);
					resolve(xmlDoc);
				} catch (err) {
					reject(null);
				}
			}
		};
		xhttp.open('GET', `/xmlFile/${xmlFilePath}`, true);
		xhttp.send();
		//console.log('response data', xhttp.responseText);
	});

const buildContextData = (xmlDoc) => {
	try {
		//console.log(xmlDoc, 'test load module');
		//document.querySelector
		console.log(xmlDoc.getElementsByTagName('tns:number')[0].textContent);
		console.log(xmlDoc.getElementsByTagName('tns:date')[0].textContent);

		const pointsElement = Array.from([...xmlDoc.getElementsByTagName('tns:explication')[0].children]);
		const pointsData =
			pointsElement?.map((rowElement) => {
				return {
					longitude: rowElement.getElementsByTagName('tns:longitude')[0].textContent,
					latitude: rowElement.getElementsByTagName('tns:latitude')[0].textContent,
				};
			}) || [];
		// При парсинге пропускаем информацию о количестве номере полигона (tns:objectNumber) и начальной и конечной точках ребра (tns:numberBegin & tns:numberEnd),
		// полагая, что полигон единственный, а точки перечислены в разделе геоинформации в порядке следования.
		// В случае наличия нескольких полигонов процедуру считывания координат необходимо зациклить на количество полигонов, параллельно проверяя
		// количество точек в полигоне (если конечная точка равна 1, то это последняя точка полигона) и порядок их следования (добавляем объект точки с указанием
		// следующей точки для соединения и при формировании последовательности координат полигона ищем координаты следующей точки по номеру tns:numberBegin равному tns:numberEnd предыдущей точки)

		const resultContext = {
			id: '1/2024',
			date: '2024-01-02',
			points: [],
		};

		resultContext.id = xmlDoc.getElementsByTagName('tns:number')[0]?.textContent || resultContext.id;
		resultContext.date = xmlDoc.getElementsByTagName('tns:date')[0]?.textContent || resultContext.date;

		pointsData.forEach((item) => {
			resultContext.points.push({ lon: Number(item.longitude), lat: Number(item.latitude) });
		});

		return resultContext;
	} catch (e) {
		writeErrorToConsole(e);
	}
};

export const buildContextFromXml = async (xmlFile) => {
	const xmlDoc = await loadXmlContent(xmlFile);
	return buildContextData(xmlDoc);
};

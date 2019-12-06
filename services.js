'use strict';
const request = require('request-promise');
const fs = require('fs');
const util = require('util');
const path = require('path');

function processWords (words, data) {
	const countedWords = [];
	const wordsArray = cleanArray(words.split(' '));
	const arrayOfData = data.split(' ');

	wordsArray.forEach((word) => {
		const wordsData = {
			word: word,
			count: 0
		};
		const regex = new RegExp(`^${word}$`, 'i');

		arrayOfData.forEach((wordToMach) => {
			const trimmedWordToMatch = wordCleanup(wordToMach);

			if (trimmedWordToMatch.match(regex)) {
				wordsData.count++;
			}
		});

		countedWords.push(wordsData);
	});

	return countedWords;
};

function wordCleanup (word) {
	return word.trim()
	.replace(/(?<=\s)[^A-Z]+?(?=\w)|(?<=\w)[^a-z]*?(?=\s|$)/gi, '').toLowerCase();
}

function cleanArray (array) {
	return [...new Set(
		array.map((word)=> {
			return wordCleanup(word)
		})
	)]
}

async function requestData (url) {
	let response;
	const options = {
		method: 'GET',
		json: true,
		uri: url
	};

	try {
		response = await request(options);
	} catch (err) {
		console.log(err);
	}

	return response;
};

async function getData (fileName) {
	const readFile = util.promisify(fs.readFile);
	let data;
	try {
		data = await readFile(path.join(__dirname, `data/${fileName}.json`), 'utf8');
	} catch (err) {
		console.error(err);
	}
	return JSON.parse(data);
}

async function writeToFile (fileName, data) {
	const writeFile = util.promisify(fs.writeFile);
	const jsonData = JSON.stringify(data);

	try {
		await writeFile(path.join(__dirname, `data/${fileName}.json`), jsonData, 'utf8');
	} catch (err) {
		console.error(err);
	}
}

async function storeRequestData (ipAdress, data) {
	try {
		const sessionsData = await getData('sessionsData');
		let updatedData = data;

		if (sessionsData[ipAdress]) {
			updatedData = [...sessionsData[ipAdress], ...data];
		}

		sessionsData[ipAdress] = updatedData;
		await writeToFile('sessionsData', sessionsData);
	} catch (err) {
		console.error(err);
	}
	return true;
}


function sortData (sortType, array) {
	let sortedResult = array;
	switch (sortType) {
	case 'asc':
		sortedResult = array.sort((a, b) => {
			return a.count > b.count;
		});
		break;
	case 'desc':
		sortedResult = array.sort((a, b) => {
			return a.count < b.count;
		});
		break;
	case 'alpha':
		sortedResult = array.sort((a, b) => {
			return a.word > b.word;
		});
		break;
	case 'rev-alpha':
		sortedResult = array.sort((a, b) => {
			return a.word < b.word;
		});
		break;
	default:
			// code block
	}

	return sortedResult;
}



module.exports = {
	processWords,
	requestData,
	getData,
	writeToFile,
	storeRequestData,
	sortData

};

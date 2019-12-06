const { processWords, wordCleanup } = require('./services');

describe('processWords', () => {
	const wordsG = 'pie pineapple pinecone apple jack jeremy';
	const dataG = 'pie  pinecone Pie Pie jack jack jackolantern. appletart applepie. pie! jack jeremy';

	it('should return an array with an object saying how many times it matched a word', () => {
		const word = 'Pie pecan';
		const countOfOccurences = processWords(word, dataG);

		expect(countOfOccurences).toEqual(
			[{
				word: 'pie',
				count: 4
			},
			{
				word: 'pecan',
				count: 0
			}]
		);
	});

	it('should return matching words when they are followed, or preceeded by, non alpha numerical symbol', () => {
		const word = 'Pie. pecan applepie!';
		const countOfOccurences = processWords(word, dataG);


		expect(countOfOccurences).toEqual(
			[{
				word: 'pie',
				count: 4
			},
			{
				word: 'pecan',
				count: 0
			},
			{
				word: 'applepie',
				count: 1
			}]
		);
	});

	it('should not return object with duplicate value for word ', () => {
		const word = 'Pie pie jack';
		const countOfOccurences = processWords(word, dataG);

		console.log(countOfOccurences);

		expect(countOfOccurences).toEqual(
			[
				{
					word: 'pie',
					count: 4
				},
				{
					word: 'jack',
					count: 3
				}
			]
		);
	});

	it('should noue for word ', () => {
		const word = '';
		const countOfOccurences = processWords(word, dataG);

		console.log(countOfOccurences);

		expect(countOfOccurences).toEqual(
			[
				{
					word: 'pie',
					count: 4
				},
				{
					word: 'jack',
					count: 3
				}
			]
		);
	});
});

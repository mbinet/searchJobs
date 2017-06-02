const express = require('express')
const app = express()
const elasticsearch = require('elasticsearch');


const esClient = new elasticsearch.Client({
	host: '127.0.0.1:9200',
	log: 'error'
});

app.get('/', function (req, res) {
	res.json('Hello World!')
})

app.get('/api', function (req, res) {
	res.json('Hello from the API')
})

app.get('/api/search/:value', function (req, res) {

	const search = function search(index, body) {
		return esClient.search({index: index, body: body});
	};

	let body = {
			size: 20,
			from: 0,
			query: {
				match: {
					name: { // type of element
						query: req.params.value, // term to look up
						fuzziness: 2 // orthographic sensibility
					}
				}
			}
		};

	search('library', body)
	.then(results => {
		let tab = { message : `found ${results.hits.total} items in ${results.took}ms`, results : []}
		if (results.hits.total > 0) {
			results.hits.hits.forEach((hit) => tab.results.push(
				{
					"id" : hit._source.id,
					"name" : hit._source.name,
					"long_name" : hit._source.long_name
				}
				));
			res.json(tab)
		}
		else {
			res.json({ })
		}
	})
	.catch(console.error);
})

app.listen(3000, function () {
	console.log('Search app listening on port 3000!')
})
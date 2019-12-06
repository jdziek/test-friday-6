# Test


### Installation
1. Use either yarn or npm
2. run 'yarn install'
3. then run 'yarn start'

### Tech
Node.js
Express 
Yarn 
jest
For db I simply used node.js filesystem. I considered mongodb due to its efficient and flexible queries
but I thought it would be a slight overkill considering the size of the app, and not everyone having mongo pre-installed.


### How to use
The server runs on localhost:3000 and accepts post and get requests to 'http://localhost:3000/'
Post is to request the word count from a desired 'page' and it accepts parameters such as these:

{ "url": "https://norvig.com/big.txt",
	"words": "The river was fast. But I was even faster",
	"sort": "rev-alpha"
}
Values for sort are: 
ascending - asc
descending - desc
in alphabetical order - alpha
reverse alphabetical order - rev-alpha
This param is optional

Get request returns previous search sessions of the user which was saved against their ip adress

For making queries to the app I suggest Insomnia or Postman

### Testing
Simply run 'yarn test'

I tested a single method 'processWords' due to the fact that its the core logic of that application, and there was a lot that could go wrong with it. One of test-cases being whether a string is followed by punctuation.
Potentially, write the tests for getting and saving the data in a json file, however, beside 'fs' itself there is very little logic in there.

### What I would change?
I should have approached that task as if I was building a web scraping software, possibly using cheerio, instead of treating it as purely a logical test. Also, it is not the fastest app due to query to external sources, which in this particular case is pretty large. Upside being is that I'm pretty sure it is still faster than chrome 'search' tool.


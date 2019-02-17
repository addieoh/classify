const fetch = require('node-fetch');

// function parsePage(sendResponse) {
// 	distinctSortedElements = []

// 	let elements = document.getElementsByTagName("p");
// 	for (let i = 0; i < elements.length; i++) {
// 		elements[i].classList.add("__centr-sentence__");
// 		elements[i].classList.add("__centr-index-" + i + "__");
// 		distinctSortedElements.push(elements[i].innerText);
// 	}
// 	let classElems = document.getElementsByClassName("zn-body__paragraph");
// 	for (let i = 0; i < classElems.length; i++) {
// 		classElems[i].classList.add("__centr-sentence__");
// 		classElems[i].classList.add("__centr-index-" + i + elements.length + "__");
// 		distinctSortedElements.push(classElems[i].innerText);
// 	}
	
// 	sendResponse(distinctSortedElements);
// 	return true;
// }

function parse(response) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		const articleURL = tabs[0].url;
		sendParseRequest(response, articleURL);
	});
}

function sendParseRequest(articleText, articleURL) {
	let url = "https://kzyre6ged7.execute-api.us-east-1.amazonaws.com/default/BiasClassificationSagemakerMiddleware"
	
	var settings = {
	  method: "post",
	  headers: {
		'Accept': '*/*',
		'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  body: JSON.stringify({"articleTags": articleText, "articleURL": articleURL})
	}

	fetch(url, settings).then(function(response) {
		if (response.status !== 200) {
			return;
		}
  		return response;
	})
	.then(response => response.text())
	.then(function(body) {
		let responseObj = JSON.parse(body);
		console.log(responseObj)
	})
	.catch(function(err) {
		console.log('fetch error: ', err); //or err.message
	});
}

console.log(sendParseRequest(["President Trump has followed through on his earlier threat to declare a national emergency over border security, and use executive authority to spend more than Congress has allowed on his so-called wall. This is an abuse of his office. Trump is letting the country down — and so are the Republicans in Congress who’ve said they’ll go along."], 'https://www.bloomberg.com/opinion/articles/2019-02-16/trump-national-emergency-is-an-affront-to-constitution'));

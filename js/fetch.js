const fetch = require('node-fetch');
const NewsAPI = require('newsapi');
var AYLIENTextAPI = require('aylien_textapi');

var textAPI = new AYLIENTextAPI({
  application_id: "	607c9140",
  application_key: "c0ffce94ad0ac0078cbdb0fa9b375a9f",
});

const newsAPI = new NewsAPI('9177944aaadd48738ce2704a464370ba');

const newsUrl = newsAPI.v2.everything({ q: 'donald trump' }).then(response => { return response['articles'][0]['url'] });


const leaningResults = async (url) => 
	textAPI.extract({'url': url}, async function(error, response) {
  	if (error === null) {
    	const res = await sendParseRequest([response['article']], url);
  	}
});

async function sendParseRequest(articleText, articleURL) {
	let url = "https://kzyre6ged7.execute-api.us-east-1.amazonaws.com/default/BiasClassificationSagemakerMiddleware"
	
	var settings = {
	  method: "post",
	  headers: {
		'Accept': '*/*',
		'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  body: JSON.stringify({"articleTags": articleText, "articleURL": articleURL})
	}

	return await fetch(url, settings).then(function(response) {
		if (response.status !== 200) {
			return;
		}
  		return response;
	})
	.then(response => response.text())
	.then(function(body) {
		let responseObj = JSON.parse(body);
		return responseObj['overall_result'];
	})
	.catch(function(err) {
		console.log('fetch error: ', err); //or err.message
	});
}
// const text = 'Another rationale for those prices is just plain greed. Dr. Warren Browner, the chief executive of California Pacific Medicine, describes this as the “Saudi Sheikh problem”: “You don’t really want to change your charges if you have a Saudi sheikh come in with a suitcase full of cash who’s going to pay full charges,” he said. But in an era when American patients are expected to be good consumers and are paying more of their bills in the form of co-pays and deductibles, they have a right to the information on list prices. They have a right to make sure they are reasonable. A lthough making chargemaster pricing public will not, by itself, reform our high-priced medical system, it is an important first step. Maybe, just maybe, a hospital will think twice before charging a $6,000 “operating room fee” for a routine colonoscopy if its competitor down the street is listing its price at $1,000. Making this information public should bring list prices more in line with what is actually paid by an insurer, a far better measure of value. And while the lists are far from user-friendly, researchers and entrepreneurs can now create apps to make it easier for patients to match procedures to their codes and crunch the numbers. With access to list prices on your phone, you could reject the $300 sling in the emergency room and instead order one for one-tenth of the price on Amazon. You could see in advance the $399 rate your hospital charges for each allergen it applies in a skin test and avoid the $48,000 allergy test — with an $8,000 deductible. As a next step, regulators should insist that these prices be easily accessible on hospitals’ home pages — perhaps in the place of “PAY YOUR BILL NOW” — and translated into plain English. Seema Verma, the head of the Centers for Medicare and Medicaid Services, has suggested that she may well do so. Patients can help, too: Check out your hospital’s price list. If it’s not detailed or complete enough, demand more. For discrete items, like an M.R.I. of the brain or a vitamin D blood test, take the trouble to scan the chargemaster for the item. Reject an overpriced procedure (even if your insurer is paying the bulk of the bill) and take your business elsewhere. Justice Louis Brandeis famously said, “Sunlight is said to be the best of disinfectants; electric light the most efficient policeman.” But, in this case, the reform will work only if people take the trouble to look — and to act — now that the lights are turned on. Elisabeth Rosenthal, a former New York Times correspondent, is the editor in chief of Kaiser Health News and the author of “An American Sickness: How Healthcare Became Big Business and How You Can Take It Back.” Follow The New York Times Opinion section on Facebook, Twitter (@NYTopinion) and Instagram.';
// const text2 = 'Another rationale for those prices is just plain greed. Dr. Warren Browner, the chief executive of California Pacific Medicine, describes this as the “Saudi Sheikh problem”: “You don’t really want to change your charges if you have a Saudi sheikh come in with a suitcase full of cash who’s going to pay full charges,” he said. But in an era when American patients are expected to be good consumers and are paying more of their bills in the form of co-pays and deductibles, they have a right to the information on list prices. They have a right to make sure they are reasonable. A lthough making chargemaster pricing public will not, by itself, reform our high-priced medical system, it is an important first step. Maybe, just maybe, a hospital will think twice before charging a $6,000 “operating room fee” for a routine colonoscopy if its competitor down the street is listing its price at $1,000. Making this information public should bring list prices more in line with what is actually paid by an insurer, a far better measure of value. And while the lists are far from user-friendly, researchers and entrepreneurs can now create apps to make it easier for patients to match procedures to their codes and crunch the numbers. With access to list prices on your phone, you could reject the $300 sling in the emergency room and instead order one for one-tenth of the price on Amazon. You could see in advance the $399 rate your hospital charges for each allergen it applies in a skin test and avoid the $48,000 allergy test — with an $8,000 deductible. As a next step, regulators should insist that these prices be easily accessible on hospitals’ home pages — perhaps in the place of “PAY YOUR BILL NOW” — and translated into plain English. Seema Verma, the head of the Centers for Medicare and Medicaid Services, has suggested that she may well do so. Patients can help, too: Check out your hospital’s price list. If it’s not detailed or complete enough, demand more. For discrete items, like an M.R.I. of the brain or a vitamin D blood test, take the trouble to scan the chargemaster for the item. Reject an overpriced procedure (even if your insurer is paying the bulk of the bill) and take your business elsewhere. Justice Louis Brandeis famously said, “Sunlight is said to be the best of disinfectants; electric light the most efficient policeman.” But, in this case, the reform will work only if people take the trouble to look — and to act — now that the lights are turned on.';
// sendParseRequest([text2], 'https://www.bloomberg.com/opinion/articles/2019-02-16/trump-national-emergency-is-an-affront-to-constitution');
console.log(leaningResults('https://www.nytimes.com/2019/01/21/opinion/trump-hospital-prices.html'));

export default leaningResults;
document.querySelector("#mainButton").addEventListener("click", function() {
  //Getting the string from the input
  const userQuery = document.getElementById("userInput").value;

  // Insert your code logic here;
  window.location.href = `/data.html?query=${userQuery}`;
});

document.querySelector("#home").addEventListener("click", function() {
  window.location.href = "/";
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function onLoad() {
  const query = getParameterByName("query");
  document.getElementById("userInput").value = query;
  let queryData;

  // Uncomment below when you get functionality working. Function header at bottom.
  // queryData = getData(query);
  var data = [
    {
      x: [
        "Liberal",
        "Left Leaning",
        "Centrist",
        "Right Leaning",
        "Conservative"
      ],
      y: queryData ? queryData : [10, 14, 20, 14, 23],
      marker: {
        color: ["#00b4cc", "#00b4cc", "#00b4cc", "#00b4cc", "#00b4cc"]
      },
      background: "blue",
      type: "bar"
    }
  ];

  Plotly.newPlot("chart", data, {}, { showSendToCloud: true });
}

// This needs to return an array of 5 numbers.
async function getData(query) {
  // AJAX Request here;
}

onLoad();

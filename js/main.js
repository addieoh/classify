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
  let query = getParameterByName("query");
  document.getElementById("userInput").value = query;

  //function to get/transform data;
  var data = [
    {
      x: [
        "Liberal",
        "Left Leaning",
        "Centrist",
        "Right Leaning",
        "Conservative"
      ],
      y: [10, 14, 20, 14, 23],
      marker: {
        color: ["#00b4cc", "#00b4cc", "#00b4cc", "#00b4cc", "#00b4cc"]
      },
      background: "blue",
      type: "bar"
    }
  ];

  Plotly.newPlot("chart", data, {}, { showSendToCloud: true });
}

onLoad();

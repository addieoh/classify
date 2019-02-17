document.querySelector("#mainButton").addEventListener("click", function() {
  //Getting the string from the input
  const userQuery = document.getElementById("userInput").value;

  // Insert your code logic here;
  window.location.href = `/data.html?query=${userQuery}`;
});

document.querySelector("#home").addEventListener("click", function() {
  window.location.href = "/";
});

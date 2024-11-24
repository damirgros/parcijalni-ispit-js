const inputField = document.getElementById("search");
const resultsList = document.getElementById("results");
const loader = document.getElementById("loader");

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function fetchResults(query) {
  resultsList.innerHTML = "";

  showLoader();

  fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=10`)
    .then((response) => response.json())
    .then((data) => {
      hideLoader();

      const results = data.results;

      if (results.length !== 0) {
        results.forEach((result) => {
          const listItem = document.createElement("li");
          listItem.textContent = result.trackName || result.collectionName;
          resultsList.appendChild(listItem);
        });
      } else {
        resultsList.innerHTML = "Upišite valjanju pretragu...";
      }
    })
    .catch((error) => console.error("Error:", error));
}

inputField.addEventListener("input", (event) => {
  const query = event.target.value;

  if (query.trim() !== "") {
    fetchResults(query);
  } else {
    resultsList.innerHTML = "Upišite valjanju pretragu...";
  }
});

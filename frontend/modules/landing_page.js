import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let res = await fetch(config.backendEndpoint+`/cities`);
    let data = await res.json();
    return data;
  }
  catch(e){
    return null;
  }
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cardRow = document.getElementById("data");

  const col= document.createElement("div");
  col.className = "col-12 col-sm-6 col-lg-3 mb-4";

  const anc = document.createElement("a");
  anc.setAttribute("href",`pages/adventures/?city=${id}`);
  anc.id = id;

  const titleDiv = document.createElement("div");
  titleDiv.className = "tile";

  const img = document.createElement("img");
  img.src = image;

  const titleTextDiv = document.createElement("div");
  titleTextDiv.className = "tile-text text-center";
  const h5 = document.createElement("h5");
  h5.innerText = city;
  const p = document.createElement("p");
  p.innerText = description;

  titleTextDiv.append(h5);
  titleTextDiv.append(p);

  titleDiv.append(img);
  titleDiv.append(titleTextDiv);
  anc.append(titleDiv);
  col.append(anc);
  // console.log(col);
  cardRow.append(col);
}

export { init, fetchCities, addCityToDOM };

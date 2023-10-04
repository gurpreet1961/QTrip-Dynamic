
import config from "../conf/index.js";

//Implementation to extract city from query params
async function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search);
  let params = new URLSearchParams(search);
  let city = params.get("city");
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    const data = await res.json()
    return data;
  } catch (error) {
    return null;
  }
 
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURESs
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  for(let i = 0; i< adventures.length; i++){
      const {category,costPerHead,currency,duration,id,image,name} = adventures[i];
      // console.log(category,costPerHead,currency,duration,id,image,name);
      const adventureElement = document.getElementById("data");
      const colElement = document.createElement("div");
      colElement.className = " col-6 col-lg-3 mb-3 position-relative";
      const pathElement = document.createElement("a");
      pathElement.href = `detail/?adventure=${id}`;
      pathElement.id = id;

      const activityElement = document.createElement("div");
      activityElement.className = "activity-card";
      
      const activityImg = document.createElement("img");
      activityImg.setAttribute("src",image);

      const activityCategory = document.createElement("div");
      activityCategory.className = "category-banner";
      activityCategory.innerText = category;

      const namePriceElement = document.createElement("div");
      const nameElement = document.createElement("p");
      nameElement.innerText = name;
      const priceElement = document.createElement("p");
      priceElement.innerText = "₹"+costPerHead;
      namePriceElement.append(nameElement);
      namePriceElement.append(priceElement);
      namePriceElement.className = "d-flex justify-content-between flex-wrap w-100 px-2 pt-3"


      const durationHoursElement = document.createElement("div");
      const durationElement = document.createElement("p");
      durationElement.innerText = "Duration";
      const hourElement = document.createElement("p");
      hourElement.innerText = duration+" Hours";
      durationHoursElement.append(durationElement);
      durationHoursElement.append(hourElement);
      durationHoursElement.className = "d-flex justify-content-between flex-wrap w-100 px-2"
      
      activityElement.append(activityImg);
      colElement.append(activityCategory);
      activityElement.append(namePriceElement);
      activityElement.append(durationHoursElement);
      pathElement.append(activityElement)
      colElement.append(pathElement);
      adventureElement.append(colElement);

  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(list.filter((a)=>a.duration >= low && a.duration <= high));
  let filteredList = list.filter((e) => (e.duration>=low && e.duration<=high));
  //console.log(filteredList);
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log(categoryList);
  let filteredList=[];
  //console.log(list);
  list.filter(function (e) {
    if(categoryList.includes(e.category))
      filteredList.push(e);   
  });

  return filteredList;


}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredlist =[]
  // Place holder for functionality to work in the Stubs
  let durationArray = filters.duration.split('-');
  if(filters["category"].length>0 && filters["duration"].length>0){
    filteredlist =filterByCategory(list, filters.category);
    filteredlist = filterByDuration(filteredlist, parseInt(durationArray[0]), parseInt(durationArray[1]));

  }else if(filters["category"].length>0){
    filteredlist= filterByCategory(list, filters.category);
  }else if( filters["duration"].length>0){
    filteredlist = filterByDuration(list,parseInt(durationArray[0]), parseInt(durationArray[1]));
  }else{
    return list
  }
  return filteredlist;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs

  let filters = JSON.parse(window.localStorage.getItem("filters"));
  console.log(filters);
  document.getElementById("duration-select").value = filters.duration;
  return filters;
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // console.log(filters);
  const pillsEle = document.getElementById("category-list");
  for(let i = 0; i < filters.category.length; i++){
    const spanEle = document.createElement("span");
    spanEle.className = "category-filter";
    spanEle.innerText = filters.category[i];
    pillsEle.append(spanEle);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

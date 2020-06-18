//CREATING A FUNCTION USING DOM TO POST ALL THE DATA FROM HEROKU SHOWS DATABASE
function displayShows(arr) {
    const shows = document.querySelector(".shows")
    //CREATING ELEMENTS USING DOM
    const showsTitle = document.createElement("h2");
    showsTitle.classList.add("shows__title");
    showsTitle.innerText = "Shows";
    shows.appendChild(showsTitle);

    const showsContainer = document.createElement("div");
    showsContainer.classList.add("shows__container")
    shows.appendChild(showsContainer);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("shows__top");
    showsContainer.appendChild(infoDiv);

    const datesTitle = document.createElement("h3");
    datesTitle.classList.add("shows__top-date");
    datesTitle.innerText = "DATES";
    infoDiv.appendChild(datesTitle);

    const venuesTitle = document.createElement("h3");
    venuesTitle.classList.add("shows__top-venue");
    venuesTitle.innerText = "VENUE";
    infoDiv.appendChild(venuesTitle);

    const locationsTitle = document.createElement("h3");
    locationsTitle.classList.add("shows__top-location");
    locationsTitle.innerText = "LOCATION";
    infoDiv.appendChild(locationsTitle);

    const hiddenEle = document.createElement("span");
    hiddenEle.classList.add("shows__hidden")
    hiddenEle.innerText = ".";
    infoDiv.appendChild(hiddenEle);


    for(let key in arr) {
        
        //container div
        const showsParent = document.createElement("div");
        showsParent.classList.add("shows__new");
        showsContainer.appendChild(showsParent);

        //Date
        const dateTitle = document.createElement("h4");
        dateTitle.classList.add("shows__date");
        dateTitle.innerText = "DATE";
        showsParent.appendChild(dateTitle);
        //Actual Date
        const dateShow = document.createElement("h3");
        dateShow.classList.add("shows__date-actual");
        dateShow.innerText = arr[key]["date"];
        showsParent.appendChild(dateShow);
        //Venue
        const venueTitle = document.createElement("h4");
        venueTitle.classList.add("shows__venue");
        venueTitle.innerText = "VENUE";
        showsParent.appendChild(venueTitle);
        //Actual Venue
        const venueShow = document.createElement("h3");
        venueShow.classList.add("shows__venue-actual");
        venueShow.innerText = arr[key]["place"];
        showsParent.appendChild(venueShow);
        //Location
        const locationTitle = document.createElement("h4");
        locationTitle.classList.add("shows__location");
        locationTitle.innerText = "LOCATION";
        showsParent.appendChild(locationTitle);
        //Actual Location
        const locationShow = document.createElement("h3");
        locationShow.classList.add("shows__location-actual");
        locationShow.innerText = arr[key]["location"];
        showsParent.appendChild(locationShow);
        //Button
        const buyTickets = document.createElement("button");
        buyTickets.classList.add("shows__button");
        buyTickets.innerText = "BUY TICKETS";
        showsParent.appendChild(buyTickets);
    }
}
//GETTING THE SHOW DATA TO POST ON SITE USING DOM
const showDates = axios.get("https://project-1-api.herokuapp.com/showdates?api_key=5515415415415415411541541")
showDates.then(response => {
    //CALLING THE FUNCTION TO CREATE THE DOM ELEMENTS AND FILL IT WITH THE DATA FROM THE DATA BASE
    displayShows(response.data);
});
showDates.catch(error => {
    console.log(error)
});
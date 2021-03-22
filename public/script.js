// making the map and the tiles
const mymap = L.map('mapid').setView([0, 0], 3);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// tileLayer expects two arguments, one is the url path, 
// second is the attribution as an object
const tiles = L.tileLayer(tileURL, {
  attribution
});
tiles.addTo(mymap);
// making a marker
const marker = L.marker([0, 0]).addTo(mymap);

// checking the geolocation
// getting the current position and then display it on the webpage
if ('geolocation' in navigator) {
  console.log('geolocation available');

  function getLocation(event) {
    // stop the page reload when we click get location
    event.preventDefault();
    // assign the value of input to a variable
    const inputValue = document.getElementById('mood').value;

    // use async keyword so we can use await
    navigator.geolocation.getCurrentPosition(async (position) => {
      // assign the latitude and longitude to variable(s)
      // add a timestamp when getLocation is called
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const timestamp = Date.now();

      // display the location to the webpage
      document.getElementById('lat').textContent = lat;
      document.getElementById('lon').textContent = lon;

      // setting the map according to the geolocation
      mymap.setView([lat, lon], 15);
      marker.setLatLng([lat, lon]);

      // send the location data and timestamp 
      // to the server using fetch()
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          inputValue,
          lat,
          lon,
          timestamp
        })
      });

      // assign the response back from server to a variable
      // and console that response
      const data = await response.json();
      console.log(data);
    })
  }
} else {
  console.log('geolocation not available');
};

// button event listener
document.getElementById('postRequest').addEventListener('click', getLocation);
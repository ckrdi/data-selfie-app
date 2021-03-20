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

  function getLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      document.getElementById('lat').textContent = lat;
      document.getElementById('lon').textContent = lon;

      // setting the map according to the geolocation
      mymap.setView([lat, lon], 15);
      marker.setLatLng([lat, lon]);

      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          lat,
          lon
        })
      });
      const data = await response.json();
      console.log(data);
    })
  }
  getLocation();
} else {
  console.log('geolocation not available');
};

document.getElementById('postRequest').addEventListener('click', getLocation);
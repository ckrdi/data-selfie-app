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
  navigator.geolocation.getCurrentPosition((position) => {
    
    document.getElementById('lat').textContent = position.coords.latitude;
    document.getElementById('lon').textContent = position.coords.longitude;

    // setting the map according to the geolocation
    mymap.setView([position.coords.latitude, position.coords.longitude], 15);
    marker.setLatLng([position.coords.latitude, position.coords.longitude]);
  });
} else {
  console.log('geolocation not available');
}
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
} else {
  console.log('geolocation not available');
}

// p5.js looks at setup function to run the library
// and automatically create the canvas on the webpage
function setup() {
  // not using canvas but createCapture to display video source
  noCanvas();
  const video = createCapture('VIDEO');
  video.size(640, 360);

  document.getElementById('postRequest').addEventListener('click', function getLocation(event) {
    // prevent the page from reloading when the button is clicked
    event.preventDefault();
    // use async keyword so we can use await
    navigator.geolocation.getCurrentPosition(async (position) => {
      // assign the latitude and longitude to variable(s)
      // add a timestamp when getLocation is called
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const timestamp = Date.now();
      // assign the value of input to a variable
      const text = document.getElementById('mood').value;

      // load the pixels of video source to p5 canvas
      // and save that pixel to binary data
      video.loadPixels();
      const image = video.canvas.toDataURL();

      // display the location to the webpage
      document.getElementById('lat').textContent = lat;
      document.getElementById('lon').textContent = lon;

      // setting the map according to the geolocation
      mymap.setView([lat, lon], 15);
      marker.setLatLng([lat, lon]);

      // send the data to the server using fetch()
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          image,
          text,
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
  })
}
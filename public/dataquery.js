async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  // iterate the array from data
  for (let i = 0; i < data.length; i++) {
    // display it to the page with simple DOM
    const order = document.createElement('ol');
    const image = document.createElement('img')
    const mood = document.createElement('li');
    const lat = document.createElement('li');
    const lon = document.createElement('li');
    const time = document.createElement('li');
    // add the image to <img> src
    image.src = data[i].image

    // convert the json object to string
    mood.textContent = 'mood: ' + JSON.stringify(data[i].text);
    lat.textContent = 'latitude: ' + JSON.stringify(data[i].lat);
    lon.textContent = 'longitude: ' + JSON.stringify(data[i].lon);
    // convert the timestamp to the date
    time.textContent = 'timestamp: ' + JSON.stringify(new Date(data[i].timestamp).toLocaleString());

    order.append(image, mood, lat, lon, time);
    document.getElementById('dataquery').append(order);
  }
};

// listen the click event button
document.getElementById('getRequest').addEventListener('click', getData);
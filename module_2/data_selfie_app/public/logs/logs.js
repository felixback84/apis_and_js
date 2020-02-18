getData();

const selfies = [];

document.getElementById('time').addEventListener('click', event => {
  sortData((a, b) => b.time - a.time);
});

document.getElementById('whatsup').addEventListener('click', event => {
  sortData((a, b) => {
    if (b.whatsUp > a.whatsUp) return -1;
    else return 1;
  });
});

function sortData(compare) {
  for (let item of selfies) {
    item.elt.remove();
  }
  selfies.sort(compare);
  for (let item of selfies) {
    document.body.append(item.elt);
  }
}

async function getData(){
  const response = await fetch('/api');
  const data = await response.json();

  for(item of data){
    const root = document.createElement('p');
    const whatsUp = document.createElement('div');
    const geolocation = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');


    whatsUp.textContent = `whatsUp: ${item.whatsUp}`;
    geolocation.textContent = `lat: ${item.lat}º, lon: ${item.lon}º`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = 'date: ' + dateString;
    image.src = item.image64;
    image.alt = 'The webcam is cover';

    root.append(whatsUp, geolocation, date, image);
    selfies.push({ elt: root, time: item.timestamp, whatsUp: item.whatsUp });
    document.body.append(root); 
  }
  console.log(data);
}

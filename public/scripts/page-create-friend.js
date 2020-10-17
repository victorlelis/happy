const map = L.map('mapid').setView([-15.826054, -48.0419924], 16);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}',
  {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapbox,
  },
).addTo(map);

const icon = L.icon({
  iconUrl: '/images/map-marker.svg',
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

map.on('click', (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;

  marker && map.removeLayer(marker);

  marker = L.marker([lat, lng], { icon }).addTo(map);
});

function addPhotoField() {
  const container = document.querySelector('#images');
  const fieldsContainer = document.querySelectorAll('.new-upload');
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);
  const input = newFieldContainer.children[0];

  if (input.value == '') {
    return;
  }
  input.value = '';
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;
  const fieldsContainer = document.querySelectorAll('.new-upload');

  if (fieldsContainer.length < 2) {
    span.parentNode.children[0].value = '';
    return;
  }
  span.parentNode.remove();
}

function toggleSelect(event) {
  document
    .querySelectorAll('.button-select button')
    .forEach((button) => button.classList.remove('active'));

  const button = event.currentTarget;
  button.classList.add('active');

  const input = document.querySelector('[name="open_on_weekends"]');
  input.value = button.dataset.value;
}

function validate(event) {
  const lat = document.querySelector('[name="lat"]').value;
  const lng = document.querySelector('[name="lng"]').value;

  if (lat == '' || lng == '') {
    event.preventDefault();
    alert('Selecione um ponto no mapa!');
  }
}

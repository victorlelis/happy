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
  popupAnchor: [170, 2],
});

function addMarker({ id, name, lat, lng }) {
  const popup = L.popup({
    closeButton: false,
    className: 'map-popup',
    minWidth: 240,
    minHeight: 240,
  }).setContent(
    `${name} <a href="friend?id=${id}"> <img src="/images/arrow-white.svg"> </a>`,
  );

  L.marker([lat, lng], { icon }).addTo(map).bindPopup(popup);
}

const friendsSpan = document.querySelectorAll('.friends span');
friendsSpan.forEach((span) => {
  const friend = {
    id: span.dataset.id,
    name: span.dataset.name,
    lat: span.dataset.lat,
    lng: span.dataset.lng,
  };
  addMarker(friend);
});

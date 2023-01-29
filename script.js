const my_api = "at_nzJhGHxeJzZ02lb7zzz6P739C16be";
const api_url = "https://geo.ipify.org/api/";
let version = "v1";

let currIP = document.querySelector(".ip-adress");
let currLoc = document.querySelector(".location");
let currTime = document.querySelector(".timezone");
let currISP = document.querySelector(".ISP");

const clientIP = document.querySelector(".ip-adress-input");
const button = document.querySelector("button");

const map = L.map("map", {
  center: [0, 0],
  zoom: 0,
  layers: [
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }),
  ],
});

updateMarker = (update_marker = [42, 42]) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
};

getIPDetails = (default_ip) => {
  if (default_ip == undefined) {
    var ip_url = `${api_url}${version}?apiKey=${my_api}`;
  } else {
    var ip_url = `${api_url}${version}?apiKey=${my_api}&ipAddress=${default_ip}`;
  }

  fetch(ip_url)
    .then((results) => results.json())
    .then((data) => {
      currIP.innerHTML = data.ip;
      currLoc.innerHTML =
        data.location.city +
        " " +
        data.location.country +
        " " +
        data.location.postalCode;
      currTime.innerHTML = data.location.timezone;
      currISP.innerHTML = data.isp;

      updateMarker([data.location.lat, data.location.lng]);
    })
    .catch((error) => console.log(error));
};

getIPDetails();

document.addEventListener("load", updateMarker());

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (clientIP.value != "" && clientIP.value != null) {
    getIPDetails(clientIP.value);
    return;
  } else {
    alert("Please enter a valid IP");
  }
});

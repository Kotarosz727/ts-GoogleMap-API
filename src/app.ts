import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });
require('dotenv').config({ path: __dirname+'/.env' });

const button = document.querySelector("button")!;
type GoogleGeocodingResponce = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const searchAddress = (event: Event): void => {
  event.preventDefault();
  const formValue = document.getElementById("address")! as HTMLInputElement;
  const enteredAddress = formValue.value;
  const encodedAddress = encodeURI(enteredAddress);

  const key = process.env.GOOGLE_API_KEY;
  const geoURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    encodedAddress +
    "&key=" +
    key;

  axios
    .get<GoogleGeocodingResponce>(geoURL)
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("data not found");
      }
      const location = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: location,
        zoom: 16,
      });
      new google.maps.Marker({ position: location, map: map });
    })
    .catch((err) => {
      alert(err.message);
    });
};

button.addEventListener("click", searchAddress);

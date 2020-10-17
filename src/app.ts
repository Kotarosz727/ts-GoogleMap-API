import axios from "axios";

const form = document.querySelector("form")!;

const searchAddress = (event: Event): void => {
  event.preventDefault();
  const formValue = document.getElementById("address")! as HTMLInputElement;
  const enteredAddress = formValue.value;
  const encodedAddress = encodeURI(enteredAddress);

  const key = "AIzaSyBwfxnZdCWTX_yqopCLD1381lyaLuKY4bE";
  const geoURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    encodedAddress +
    "&key=" +
    key;

  axios
    .get(geoURL)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener("click", searchAddress);

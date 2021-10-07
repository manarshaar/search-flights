const search_from = document.getElementById("flight_from");
const search_from_id = document.getElementById("flight_from_id");
const search_to = document.getElementById("flight_to");
const search_to_id = document.getElementById("flight_to_id");
const depart_date = document.getElementById("flight_depart");
const return_date = document.getElementById("flight_return");

const search_button = document.getElementById("flight_search");

const inputs = document.querySelectorAll(".form_unit input:first-of-type");
const inputs_validators = document.querySelectorAll(".form_unit span");

const flight_from_options = document.querySelector("#flight_from_options");
const flight_to_options = document.querySelector("#flight_to_options");

let input_from, input_to;

const validateInputs = () => {
  let f = true;
  inputs.forEach((input, i) => {
    if (input.value === "") {
      inputs_validators[i].style.display = "block";
      f = false;
    } else {
      inputs_validators[i].style.display = "none";
    }
  });
  return f;
};

let searchFlights = (ev) => {
  ev.preventDefault();

  if (validateInputs()) {
    let from = search_from_id.value; //BUD-sky
    let to = search_to_id.value; //IT-sky
    let date1 = depart_date.value; //2021-10-13
    let date2 = return_date.value; //2021-10-30

    //BUD-sky/IT-sky/2021-10-13/2021-10-30

    fetch(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${from}/${to}/${date1}/${date2}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "df421e16a0msh56c7f5a0b77c14bp1128c1jsn3a5e2f818ea5",
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
};

let typingSearch = (dest) => {
  let from = search_from.value;
  let to = search_to.value;
  let query = dest ? to : from;
  if (query) {
    fetch(
      `https://www.skyscanner.com/g/autosuggest-flights/JO/en-US/${query}?isDestination=${dest}&enable_general_search_v2=true`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "df421e16a0msh56c7f5a0b77c14bp1128c1jsn3a5e2f818ea5",
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && dest) {
          input_to = data;
          flight_to_options.innerHTML = "";
          input_to.forEach((op) => {
            // console.log("added",op.PlaceName);
            var option = document.createElement("option");
            var t = document.createTextNode(op.PlaceName);
            option.appendChild(t);
            flight_to_options.appendChild(option);
          });
        } else if (data) {
          input_from = data;
          flight_from_options.innerHTML = "";
          input_from.forEach((op) => {
            var option = document.createElement("option");
            var t = document.createTextNode(op.PlaceName);
            option.appendChild(t);
            flight_from_options.appendChild(option);
          });
        }
      })
      .catch((err) => console.log(err));
  }
};

search_button.addEventListener("click", searchFlights);

search_from.addEventListener("focusout", (event) => {
  if (input_from) search_from_id.value = input_from[0].PlaceId + "-sky";
});

search_to.addEventListener("focusout", (event) => {
  if (input_to) search_to_id.value = input_to[0].PlaceId + "-sky";
});



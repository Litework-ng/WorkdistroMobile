import { faHelmetSafety } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

let FetchLoction2 = async (query) => {
  try {
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        input: "surulere magistrate court",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "AIzaSyDvtWNeV6bFqQ51ZRl8WDbRi_73OhHs1VU",
        },
      }
    );
    const lol = await response.data;
    return lol;
  } catch (error) {
    console.log("nawa o");
    console.log(error);
  }
};

const FetchLoction = async (location) => {
  try {
    const request = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=AIzaSyDvtWNeV6bFqQ51ZRl8WDbRi_73OhHs1VU`
    );
    let data = request.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error, "this stupid error");
  }
};
export default FetchLoction;

// import axios from "axios";

// const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_API_KEY";

// const fetchAutocompleteData = async (input) => {
//   try {
//     const response = await axios.post(
//       "https://places.googleapis.com/v1/places:autocomplete",
//       {
//         input,
//         locationBias: {
//           circle: {
//             center: {
//               latitude: 37.7937,
//               longitude: -122.3965,
//             },
//             radius: 500.0,
//           },
//         },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
//         },
//       }
//     );
//     return response.data.predictions;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

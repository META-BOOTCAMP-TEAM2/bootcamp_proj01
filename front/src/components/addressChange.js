import axios from "axios";

const change = async (address) => {
  const apiKey = "AIzaSyAF--ZmANNDuao7xDJN08MoaDem3RJbtKg"; // Google Geocoding API 키

  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: address,
        key: apiKey,
      },
    });

    const results = response.data.results;
    if (results.length > 0) {
      const location = results[0].geometry.location;
      const lat = location.lat;
      const lng = location.lng;
      return { lat, lng };
    } else {
      throw new Error("No results found.");
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
};

const addressChange = async (address) => {
  try {
    const position = await change(address);
    // const formattedPosition = `${position.lat},${position.lng}`;

    return position;
  } catch (error) {
    console.log(error);
  }
};

export default addressChange;

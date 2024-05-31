import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      // Make a POST request to the forgot password API endpoint
      const response = await axios.post(
        "http://localhost:5000/api/v1/forgot-password",
        { email }
      );

      // Send the response from the API
      res.status(response.status).json(response.data);
    } catch (error) {
      // Handle error
      res.status(error.response.status).json(error.response.data);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

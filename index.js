import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Any questions text me RobinSuthar (Teams)

app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "Yo! What's up ? This is our back end" });
});

app.post("/api/v1/information", async (req, res) => {
  try {
    // Extract user input from request body
    const userInput = req.body;
    console.log(userInput);
    const options = {
      method: "POST",
      url: "https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose",
      params: { noqueue: "1" },
      headers: {
        "x-rapidapi-key": "4da7c7ee36msh1e89b03d8771a2fp11fbc3jsnd5fedcf4d566",
        "x-rapidapi-host":
          "ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: userInput, // Send the user-provided data to the API
    };

    console.log(options);

    const response = await axios.request(options);
    console.log(options);
    res.json({
      result: response.data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch diagnosis results" });
  }
});

app.listen(3001, function () {
  console.log("Backend Listening on port");
});

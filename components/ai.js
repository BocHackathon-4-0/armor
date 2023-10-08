import axios from 'axios'; // Assuming you've installed axios: `npm install axios`

export const askGPT3 = async (prompt) => {
  try {
    const response = await axios.post('/api/chat', { message: prompt });
    return response.data.message;
  } catch (error) {
    console.error("There was an error making the request:", error);
    return "Sorry, I couldn't process that.";
  }
};

import axios from "axios";

// Replace with the JWT you received from /api/auth/login
const TOKEN = "YOUR_JWT_TOKEN_HERE";

async function getProfile() {
  try {
    const response = await axios.get("http://localhost:5003/api/user/profile", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    console.log("✅ Profile data:", response.data);
  } catch (err: any) {
    if (err.response) {
      console.error("❌ Error:", err.response.data);
    } else {
      console.error("❌ Request failed:", err.message);
    }
  }
}

getProfile();

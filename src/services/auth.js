import axios from "../utils/axios";


const authService = {
  login: async (email, password) => {
    try {
      console.log(axios.baseUrl)
      const response = await axios.post('/api/users/login', {
        email: email,
        password: password
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("Logged in successfully as " + response.data.username);
        return response;
      } else if (response.status === 401) {
        throw new Error("Login failed. Couldn't find a user with these credentials.");
      } else if (response.status === 400) {
        throw new Error("Login failed. Email invalid or password blank.");
      } else {
        throw new Error("Unknown Error.");
      }

    } catch (error) {
      console.log(error);
      throw new Error(`Unknown Error occured in axios request: ${error}`);
    }
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  register: async (username, email, password) => {
    try {
      const response = await axios.post('/api/users/register', {
        username,
        email,
        password
      });

      if (response.status === 200) {
        console.log('Registered successfully.');
        return response.data.username;
      } else {
        console.log("Registration failed.");
        throw new Error("Registration failed.");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Unexpected error during registration.");
    }
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default authService;
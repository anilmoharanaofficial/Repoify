import axios from "axios";
import inquirer from "inquirer";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import fs from "fs/promises";
import path from "path";

const COOKIE_PATH = path.resolve(process.cwd(), ".repoify_cookies.json");

const loginCommand = async () => {
  try {
    // User credentials
    const { username, password } = await inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "Enter your username:",
        validate: (input) => (input ? true : "Username cannot be empty"),
      },
      {
        type: "password",
        name: "password",
        message: "Enter your password:",
        validate: (input) => (input ? true : "Password cannot be empty"),
      },
    ]);

    // Set up a cookie jar
    const jar = new CookieJar();
    const client = wrapper(axios.create({ jar }));

    // Send login request
    const response = await client.post(
      "http://localhost:4622/api/v1/auth/login",
      {
        username,
        password,
      }
    );

    if (response.status === 200) {
      console.log("Login successful!");

      // Save cookies
      const cookies = await jar.serialize();
      await fs.writeFile(COOKIE_PATH, JSON.stringify(cookies, null, 2));
      console.log("Session cookies saved!");
    } else {
      console.error("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

export default loginCommand;

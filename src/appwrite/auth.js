import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

// AuthService class
/*
    NOTE: The appwrite service-logic is kept separate from the client-side code to 
    - maintain code cleanliness
    - to avoid vendor-lock-in (Vendor Lock-in basically means that the code is heavily dependent on the Vendor/service-provider. This makes it difficult to switch to a different service later on). Whenever a new backend service is to be attached with this project, we will simply have to change code in this file (rather than making changes to the React components everywhere).
*/
class AuthService {
  client = new Client();
  account;

  /*
    Constructor is called whenever an instance of AuthService class is created, and the client & account are initialized
  */
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // createAccount method
  // NOTE: The client will pass an object with email, password and name
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name // optional argument
      );
      if (userAccount) {
        // Call login-method
        const response = await this.login({ email, password });
        return response;
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // login method
  async login({ email, password }) {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // NOTE: getCurrentUser gives the currently logged-in user
  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();
      return currentUser ? currentUser : null;
    } catch (error) {
      throw error;
    }
  }

  // logout method
  async logout() {
    try {
      // const response = await this.account.deleteSession("current"); // logout from the current device-session
      const response = await this.account.deleteSessions(); // logout from all the devices/browsers
      return response ? response : null;
    } catch (error) {
      throw error;
    }
  }
}

// Export the authService object directly to the client-side code so that it doesn't have to create an instance of AuthService class everytime
const authService = new AuthService();
export default authService;

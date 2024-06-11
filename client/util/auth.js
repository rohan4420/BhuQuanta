import axios from "axios";

const API_KEY = "AIzaSyCIPWXbKvRz8nLgSvaM898H9NlR-L-Cn_4";

export const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
};
export const CreateUser = async (email, password) => {
  await authenticate("signUp", email, password);
};
export const login = async (email, password) => {
  await authenticate("signInWithPassword", email, password);
};

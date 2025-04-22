import axios from "axios";

const url =
  process.env.NEXT_PUBLIC_STATE == "development"
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL;

export const signup = async (
  Username: string,
  Email: string,
  Password: string
) => {
  if (!Username || !Password || !Email) {
    console.error("Didnt get  user info");
    return;
  }

  try {
    const res = await axios.post(`${url}/api/auth/signin/`, {
      Username,
      Password,
      Email,
    });

    return {
      ID: res.data.data.ID,
      Username: res.data.data.Username,
      Image: res.data.data.Image,
      Email: res.data.data.Email,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signin = async (Email: string, Password: string) => {
  if (!Password || !Email) {
    console.error("Didnt get  user info");
    return;
  }

  try {
    const res = await axios.post(`${url}/api/auth/signin/`, {
      Password,
      Email,
    });
    console.log(res);

    return {
      ID: res.data.data.ID,
      Username: res.data.data.Username,
      Image: res.data.data.Image,
      Email: res.data.data.Email,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const post = async (Email: string, Password: string) => {
  if (!Password || !Email) {
    console.error("Didnt get  user info");
    return;
  }

  try {
    const res = await axios.post(`${url}/api/auth/signin/`, {
      Password,
      Email,
    });
    console.log(res);

    return {
      ID: res.data.data.ID,
      Username: res.data.data.Username,
      Image: res.data.data.Image,
      Email: res.data.data.Email,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

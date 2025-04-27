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
    const res = await axios.post(
      `${url}/api/auth/signin/`,
      {
        Username,
        Password,
        Email,
      },
      {
        withCredentials: true,
      }
    );

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
    const res = await axios.post(
      `${url}/api/auth/signin/`,
      {
        Password,
        Email,
      },
      {
        withCredentials: true,
      }
    );
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

export const post = async (data: any) => {
  console.log(data);

  try {
    const res = await axios.post(`${url}/api/post/create`, data, {
      withCredentials: true,
    });
    console.log(res);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPost = async (id: string) => {
  try {
    const res = await axios.get(`${url}/api/post/get/${id}`, {
      withCredentials: true,
    });

    return {
      ID: res.data.data.ID,
      Title: res.data.data.Title,
      Content: res.data.data.Content,
      AuthorName: res.data.username.data,
      Likes: res.data.data.Likes,
      Dislikes: res.data.data.Dislikes,
      tags: res.data.data.Tags,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

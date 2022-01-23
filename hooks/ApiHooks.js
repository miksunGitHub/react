import {useEffect, useState} from "react";
import {baseUrl} from "../utils/Variables";

const doFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if(response.ok){
      return json;
    } else {
      const message= json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new error (error.message);
  }
}

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async (start=0, limit=10) =>{
    try{
      const response = await fetch(
        `${baseUrl}media?start=${start}&limit=${limit}`);
      if(!response.ok){
        throw Error(response.statusText);
      }
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl+'media/'+item.file_id);
          const mediaData = await response.json();

          return mediaData;
        })
      );

      setMediaArray(media);
      console.log(mediaArray);

    }catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    loadMedia(0, 5);

  }, []);

  return {mediaArray};
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    return await doFetch(baseUrl + 'login', options);
  };
  return {postLogin};
};

const useUser = () => {

  const getUserByToken = async (token) => {

    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await doFetch(baseUrl + 'users/user', options);

  };

  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };
  return {getUserByToken, postUser};
};

export {useMedia, useLogin, useUser};

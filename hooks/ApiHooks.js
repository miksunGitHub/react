import {useEffect, useState} from "react";
import {baseUrl} from "../utils/Variables";

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

export {useMedia};
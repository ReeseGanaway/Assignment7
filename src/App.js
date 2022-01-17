import "./App.css";
import React, { useEffect, useState } from "react";
import GifCard from "./components/GifCard";
import SearchField from "./components/SearchField";

export default function App() {
  const trendingUrl = `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}`;
  let randomUrl = "";
  const [isRandom, setIsRandom] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [randomGif, setRandomGif] = useState({});

  const fetchTrendingGif = async () => {
    try {
      const response = await fetch(trendingUrl);
      const trendingData = await response.json();
      setGifs(trendingData.data);
      setIsRandom(false);
      //console.log(gifs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRandomGif();
    fetchTrendingGif();

    return () => {
      setGifs([]);
      setRandomGif({});
    };
  }, []);

  const onChange = (e) => {
    console.log(e.target.value);
    if (!e.target.value) {
      document.querySelector(".TrendingHeader").innerHTML = "Trending!";
      fetchTrendingGif();
    } else {
      const fetchSearchedGif = async () => {
        try {
          const response = await fetch(
            `http://api.giphy.com/v1/gifs/search?q=${e.target.value}&api_key=${process.env.REACT_APP_API_KEY}`
          );
          const searchData = await response.json();
          setGifs(searchData.data);
          //console.log('Hi',gifs)
          setIsRandom(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSearchedGif();
      document.querySelector(".TrendingHeader").innerHTML = "Results";
    }
  };

  const fetchRandomGif = async () => {
    //setIsRandom(true);
    try {
      const response = await fetch(
        `http://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const randomData = await response.json();
      setRandomGif(randomData.data);
      console.log(randomData.data, randomGif);
    } catch (error) {
      console.log(error);
    }
  };

  /* useEffect(() => {
    fetchRandomGif();

    return () => {
      setRandomGif([]);
    };
  }, []);*/

  function onClick() {
    fetchRandomGif();
    //console.log(randomUrl);
    setIsRandom(true);
  }

  return (
    <div className="App">
      <h1 className="TrendingHeader">Trending!</h1>
      <SearchField className="SearchField" onChange={onChange} />
      <div id="RandomButtonBox">
        <button id="RandomButton" onClick={onClick}>
          Randomize!
        </button>
      </div>
      <div className="Gif-Box">
        {isRandom === false ? (
          gifs.map((x) => (
            <GifCard className="Gifs" url={x.images.original.url} />
          ))
        ) : (
          <GifCard className="Gifs" url={randomGif.images.original.url} />
        )}
      </div>
    </div>
  );
}

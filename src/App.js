import './App.css';
import React, {useEffect, useState } from 'react'
import GifCard from "./components/GifCard"
import SearchField from "./components/SearchField"




export default function App() {

  const trendingUrl=`http://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}`
  const [loading, setLoading]= useState(true)
  const [gifs,setGifs]=useState([])
  const [searchText,setSearchText] = useState("")
  

  const fetchTrendingGif= async()=> {
    try{
      const response= await fetch(trendingUrl);
      const trendingData= await response.json()
      setGifs(trendingData.data)
      //console.log(gifs)
      setLoading(false)
    } catch(error){
      console.log(error)
    }
  }
  
  /*const fetchSearchedGif= async()=> {
      try{
        const response= await fetch(searchUrl);
        const trendingData= await response.json()
        setGifs(trendingData.data)
        console.log(gifs)
        setLoading(false)
      } catch(error){
        console.log(error)
      }
    }*/

  

  useEffect( () => {
    fetchTrendingGif();
    return () => {
      setGifs([]);
    };
  }, [])

  const onChange = (e) =>{
    console.log(e.target.value)
    if(!e.target.value){
      
      document.querySelector('.TrendingHeader').innerHTML="Trending!";
      fetchTrendingGif();
    }
    const fetchSearchedGif= async()=>{
    try{
      const response= await fetch(`http://api.giphy.com/v1/gifs/search?q=${e.target.value}&api_key=${process.env.REACT_APP_API_KEY}`);
      const searchData= await response.json()
      setGifs(searchData.data)
      //console.log('Hi',gifs)
      setLoading(false)
    } catch(error){
      console.log(error)
    }}
    fetchSearchedGif();
    document.querySelector('.TrendingHeader').innerHTML="Results";


  }
  
  return (
    <div className="App">
      <h1 className='TrendingHeader'>Trending!
      </h1>
      <SearchField className='SearchField' onChange={onChange}/>
      <div className="Gif-Box">
      {gifs.map((x)=>(
         <GifCard className="Gifs" url={x.images.original.url}/>))}
      </div>
      
    </div>
  );
}




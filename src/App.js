import './App.css';
import React, {useEffect, useState } from 'react'
import GifCard from "./components/GifCard"
import SearchField from "./components/SearchField"




export default function App() {

  const trendingUrl=`http://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}`

  const [loading, setLoading]= useState(true)
  const [gifs,setGifs]=useState([])
  const [searchText,setSearchText] = useState("")
  

 const fetchGif= async()=> {
    try{
      const response= await fetch(trendingUrl);
      const trendingData= await response.json()
      setGifs(trendingData.data)
      setLoading(false)
    } catch(error){
      console.log(error)
    }
  }

  

  useEffect( () => {
    fetchGif();
    console.log(gifs[0].images)
  }, [])

  const onChange = (e) =>{
    setSearchText(e.target.value)
  }
  
  return (
    <div className="App">
      <h1 className='Trending-GIFs'>Trending!
      <div className="Gif-Box">
      {gifs.map((x)=>(
         <GifCard padding="100px" url={x.images.original.url}/>))}
      </div>
      </h1>
      <SearchField onChange={onChange}/>
    </div>
  );
}




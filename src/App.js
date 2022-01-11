import './App.css';
import React, {useEffect, useState } from 'react'
import GifCard from "./components/GifCard"
import SearchField from "./components/SearchField"




export default function App() {

  const trendingUrl=`http://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&limitToFirst=5`

  const [loading, setLoading]= useState(true)
  const [gifs,setGifs]=useState([])
  const [searchText,setSearchText] = useState("")
  

  const fetchGif= async () =>{
    try{
      const response= await fetch(trendingUrl);
      const data= await response.json()
      setGifs(data)
      setLoading(false)
      console.log(gifs.data[0].url)
      //https://giphy.com/embed/aFFQ894LujNBXZY6C0
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchGif();
  }, [])

  const onChange = (e) =>{
    setSearchText(e.target.value)
  }
  
  return (
    <div className="App">
      <header className='homeGIFs'>
        {loading===false ? <img href="gifs.data[0].url"></img>:<p>Loading</p>}
      </header>
      <SearchField onChange={onChange} />
    </div>
  );
}




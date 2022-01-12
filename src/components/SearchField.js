//import react, {useState} from "react"

export default function SearchField(props){


    return(
        <div className='SearchField'>
            <form>
            <label className="SearchLabel">Search</label>
            <input className='SearchBox' onChange={props.onChange} type="text" id="search" >
            </input>
            </form>
        </div>
    )
}
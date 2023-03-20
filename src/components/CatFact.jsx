import {useEffect, useState} from 'react';
import '../styles/CatFact.css'
function CatFact(){
  
  const [messageObject, setMessageObject] = useState({fact:'',length:''});
  const [gifsUrls, setGifsUrls] = useState([]);
  const [messageUpdated, setMessageUpdated] = useState(false);
  const[resultAmount, setResultAmount]= useState(5);
  const[wordsAmount, setWordsAmount] = useState(3);
  

  useEffect(()=>{ //Capturar mensaje
  async function fetchMessage(){
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json(); 
    setMessageObject(data);            
  }
    fetchMessage();
    setMessageUpdated(true);
  },[]);
  
  useEffect(()=>{ //Buscar gifs
     const messageObjectCopy = {...messageObject}
     const messageStr = messageObjectCopy.fact;
     const messageSplited = messageStr.split(" ");
     const messageFirstWords = messageSplited.slice(0,wordsAmount);
     const shortMessage = messageFirstWords.join(" ");    
     const apiKey = 'zBz7LS7bkvDJxUnbTF9D02N2AAZ1LVdl';
    


    async function searchGif(){
        const response = 
        await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${shortMessage}&limit=${resultAmount}&offset=0&rating=g&lang=en`);
        const data = await response.json();
        setGifsUrls(data.data);
        console.log(data);
    } 
    searchGif();       
  },[messageUpdated,messageObject,resultAmount, wordsAmount]);

    const handleResultAmount= (event)=>{
      setResultAmount(event.target.value);
    }

    const handleWordsAmount =(event)=>{
      setWordsAmount(event.target.value);
    }

  return(

    
    <div className="cat-fact-container">
      <h1>Random Cat quote</h1>
      <div className="cat-fact-menu">
        <label>
        Gifs:
        </label>
        <select onChange={handleResultAmount}>
        {
          [5,10,15,20].map((number)=>{return(<option value={number}>{number}</option>)})
        }  
        </select>
        <label>
          Palabras a buscar:          
        </label>
        <select onChange={handleWordsAmount}>
          {[1,2,3,4,5].map((number)=>{return(<option value={number}>{number}</option>)})}
        </select>


      </div>      
      <h2>Frase:</h2>
      <p className="cat-fact-message">
        {messageObject.fact}
      </p>
      <div className="cat-fact-gifs">
         {
           gifsUrls.map((gifsUrls)=>{return <img src={gifsUrls.images.original.url}/>})
         }
      </div>
    </div>
  )
}
export  default CatFact;
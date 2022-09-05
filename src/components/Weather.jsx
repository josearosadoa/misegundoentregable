import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Weather = () => {

    const [weather, setWeather]= useState({})
    const [isCelsius, setIsCelsius] = useState(true)
    const temp = Math.floor(weather.main?.temp -273.15)
    const description = weather.weather?.[0].description
    
    

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)

       

        function success(pos){
            const crd = pos.coords
           

            console.log(crd)
            console.log(`l ${crd.latitude}`)
            console.log(`l ${crd.longitude}`)
            console.log(`l ${crd.accuracy}`)

    


        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=778978479ae79ba109f65cf3675528d7`)
        .then(res => setWeather(res.data))
        
        }

    },[])

   
    


    console.log(weather)


   
    return (

        <div className>
            
            <h1>Wheater App </h1>
            <h2>{weather.name}, {weather.sys?.country}</h2>

            <div className='wheater-decoration'> 
                <section>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`} alt='' /> 
            <br />
            <p>{isCelsius ? temp : Math.floor(temp * 1.8 + 32)} {isCelsius ? '°C' : '°F'}</p>
            </section>
            

            <section>
                <p>"{weather.weather?.[0].description}"</p>
                <p>Wind Speed: {weather.wind?.speed} m/s</p>
                <p><i class="fa-solid fa-cloud"></i> Clouds: {weather.clouds?.all}%</p>
                <p><i class="fa-solid fa-temperature-three-quarters"></i> Pressure: {Math.floor(weather.main?.pressure /100)} mb</p>
            </section>

            </div>
            <button className='btn-wheather' onClick={() => setIsCelsius(!isCelsius) }>Degrees °F/°C {isCelsius ? '°C' : '°F'}</button>


           
        </div>
    );
};

export default Weather; 
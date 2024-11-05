
        async function getWeather() {
            const city = document.getElementById('city').value.trim();

            // Check if city input is empty
            if (!city) {
                alert('Please enter a location.');
                return;
            }

            // Display loading indicator
           // document.getElementById('loading-container').style.display = 'block';
           // document.getElementById('weather-container').style.display = 'none';
          //  document.getElementById('forecast-container').style.display = 'none';

            const apiKey = '57200d6f65e673a8f51b726273aa8c02';
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            try {
                // Fetch current weather data
                const response = await fetch(geoUrl);
                if (!response.ok) throw new Error('City not found');

                const data = await response.json();
                const now = new Date();
                const date = now.toLocaleDateString();
                // Display fetched data
                document.getElementById('ttime').textContent ="Today (" +date+")";
                document.getElementById('city1').textContent = data.name ;
                document.getElementById('mode1').textContent = data.weather[0].main;
                document.getElementById('mode').textContent = data.weather[0].description;

                
                const iconCode = data.weather[0].icon;
                
                 const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    
                 const imgElement = document.getElementById('weatherIcon');
                imgElement.src = iconUrl;
                if (data.weather[0].main === "Haze") {
                    imgElement.style.backgroundColor = "white";
                }
                else {
                    imgElement.style.backgroundColor = ""; // Reset background color for other conditions
                }
                imgElement.classList.add('active-icon');
                document.getElementById('temperature').textContent = data.main.temp+"°C";
                document.getElementById('humidity').textContent = "Humidity: "+data.main.humidity+"%";
                document.getElementById('coordinates').textContent = `Lat: ${data.coord.lat}, Lon: ${data.coord.lon}`;

                console.log(data.weather[0].main+"====k");

                // Fetch 5-day forecast using latitude and longitude
                await getForecast(data.coord.lat, data.coord.lon);
             
                
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                // Hide loading indicator after data is loaded or an error occurs
                
            }
        }

        async function getForecast(lat, lon) {
            const apiKey = '57200d6f65e673a8f51b726273aa8c02';
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
           
            try {
                const response = await fetch(forecastUrl);
                if (!response.ok) throw new Error('Forecast data not found');
               
                const data = await response.json();
                

                document.getElementById('sunrise').textContent = new Date(data.city.sunrise * 1000).toLocaleTimeString();
                document.getElementById('population').textContent = data.city.population;
                document.getElementById('sunset').textContent = new Date(data.city.sunset * 1000).toLocaleTimeString();
              
                
                // Print city information
                // const cityInfo = `
                //     <h3>City Information:</h3>
                //     <p>Name: ${data.city.name}</p>
                //     <p>Country: ${data.city.country}</p>
                //     <p>Population: ${data.city.population}</p>
                //     <p>Timezone: ${data.city.timezone}</p>
                //     <p>Coordinates: Lat: ${data.city.coord.lat}, Lon: ${data.city.coord.lon}</p>
                //     <p>Sunrise: ${new Date(data.city.sunrise * 1000).toLocaleTimeString()}</p>
                //     <p>Sunset: ${new Date(data.city.sunset * 1000).toLocaleTimeString()}</p>
                // `;
                // forecastContainer.innerHTML += cityInfo;
                let zz=0;
                // Print forecast details
               
                let count=1;
                data.list.forEach(entry => {
                    const date = new Date(entry.dt * 1000).toLocaleString();
                    const temperature = entry.main.temp;
                    const feelsLike = entry.main.feels_like;
                    const pressure = entry.main.pressure;
                    const humidity = entry.main.humidity;
                    const weatherDescription = entry.weather[0].description;
                    const windSpeed = entry.wind.speed;
                    const windDeg = entry.wind.deg;
                    const visibility = entry.visibility;
                  
                    let d1=new Date(entry.dt * 1000).toLocaleString();
                    console.log(entry.weather[0].main);
                    if(zz==0){
                        document.getElementById('windspeed').textContent = entry.wind.speed+" m/s";
                        document.getElementById('winddeg').textContent =  windDeg+"°";
                        document.getElementById('pressure').textContent = pressure +" hPa";
                        document.getElementById('visibility').textContent = entry.visibility+"meters" ;
                        let d1=new Date(entry.dt * 1000).toLocaleString();
                        
                        
                        zz=zz+1;
                    } 
                   
                    let time = d1.split(',')[1].trim();
                    let datePart = d1.split(',')[0].trim();
                    if (time === "11:30:00 am") {
                              
                              let kk="d"+zz;
                                let ddd='im'+zz
                              document.getElementById(kk).textContent = datePart+"";
                              document.getElementById("de"+zz).textContent = entry.weather[0].description;
                              document.getElementById("dt"+zz).textContent = temperature +"°C   ";
                              console.log(ddd);
                              let iconCode = entry.weather[0].icon;
                
                                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
                                
                                let imgElement = document.getElementById(ddd);
                                imgElement.src = iconUrl;
                             
                              zz+=1
                        }
                        const now = new Date();
                        
                    if(count<=5){
                        let hhh='i'+count;
                        console.log(hhh);
                        document.getElementById("t"+count).textContent = time+"";
                        document.getElementById("dtt"+count).textContent = " "+temperature +"  °Ce      ";
                        document.getElementById("dte"+count).textContent = weatherDescription;
                       // document.getElementById("t"+count).textContent = " "+temperature +"  °Ce      "+time+"";
                       
                       let iconCode = entry.weather[0].icon;
                
                       const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
   
                       let imgElement = document.getElementById(hhh);
                       imgElement.src = iconUrl;
                        count+=1;
                    }
                        
                   

                    
                });









                //document.getElementById('forecast-container').style.display = 'block';

            } catch (error) {
                alert('Error fetching forecast: ' + error.message);
            }
        }

        function updateDateTime() {
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
        
            document.getElementById('date').innerHTML = `${date}`;
            document.getElementById('time').innerHTML = `${time}`;
        }
        
        //setInterval(updateDateTime, 1000);
       // updateDateTime();
    
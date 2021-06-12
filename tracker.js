    mapboxgl.accessToken = 'pk.eyJ1IjoiamFtYWxsIiwiYSI6ImNrcG0yb3k1ZTF5OXkybm85cG1zdXB1Z2EifQ.0WoIJgYiGQiVH_lBbHRSXQ';
        const map = new mapboxgl.Map({
            container: 'map',
	            style: 'mapbox://styles/mapbox/streets-v11',
	           center: [-71.104081, 42.365554],
               zoom: 12
        })

        const marker = new mapboxgl.Marker().setLngLat([-71.104081, 42.365554]).addTo(map);

        const counter = 0;

        async function move(){
            const updated = await update()
            if (counter >= updated.length) return;
            for (let i = 0; i < updated.length; i++) {
                const lat = updated[i].attributes.latitude;
                const lng = updated[i].attributes.longitude;
                const status = updated[i].attributes.occupancy_status
                marker.setLngLat([lng, lat])
                
                
                console.log(lng, lat)
                
            }

            setTimeout(move, 15000)
        }


        async function update(){
            const locations = await getBusInfo();
            console.log(new Date())
            console.log(locations)
            return locations
            
        }
        setTimeout(update, 15000)

        async function getBusInfo(){
            const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
            const response = await fetch(url);
            const json     = await response.json();
            console.log(json.data)
            return json.data
               
        }

        update()
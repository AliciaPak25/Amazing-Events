var events = []

async function JSONCapture() {
     await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json => events.push(...json.eventos))
    

    /* ID's */
    
    var id= location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    var card = events.find(function(datum){
        return datum.id == selectedId; 
    })
        var templateHTML = ""
     templateHTML = 
    `
    <div class="detail">
        <img src="${card.image}" alt="evento" class="avengersdetail">
        <div class="divdetail">
            <h3>${card.name}</h3>
            <p class="dateandplace">${card.date} - ${card.place}</p>
            <p>Descripción: ${card.description}</p>
            <p>Costo: ${card.price}</p>
            <p>Invitados: ${card.assistance || card.estimate}</p>
            <p>Capacidad: ${card.capacity}</p>
            <p>Categoría: ${card.category}</p>
        </div>       
    </div>
    `
    document.querySelector(".detail").innerHTML = templateHTML

   
    
}
JSONCapture()
   

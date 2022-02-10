var pastDate = "";
var past = ""
var pastArray = [];
var datajson = {};

async function getData(){
    var data = {}
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(response => response.json())
        .then(json => {datajson = {...json}
        data = {...json} 
        })
        pastDate = data.fechaActual
        
        pastArray.push(...data.eventos.filter(element => element.date < pastDate))
        
        displayCard(pastArray)
        
} 
    getData()
    
function displayCard(arrayDePasados){

arrayDePasados.map(card =>{
    
    past += 
`
        <a href="../detalle.html?id=${card.id}" class = "pastfuture">
        <section class = "pastfuture">
            <div class="divcards">
            <img src="${card.image}" class="media">
            <h3>${card.name}</h3>
            <p>${card.date}</p>
            <p>${card.description}</p>
            <p>Invitados: ${card.assistance}</p>
            </div>
         </section> 
        </a>
`}
)

document.querySelector(".past").innerHTML = past

}
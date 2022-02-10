var presentDate = "";
var future = ""
var futureArray = [];
var datajson = {};

async function getData(){
    var data = {}
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(response => response.json())
        .then(json => {datajson = {...json}
        data = {...json} 
        })
        presentDate = data.fechaActual
        
        futureArray.push(...data.eventos.filter(element => element.date > presentDate))
        
        displayCard(futureArray)
        
} 
    getData()

function displayCard(arrayDeFuturos){
 
arrayDeFuturos.map(card =>{
    console.log(card)
    future += 
`
<a href="../detalle.html?id=${card.id}" class = "pastfuture">
<section class = "pastfuture">
<div class="divcards">
<img src="${card.image}" class="media">
<h3>${card.name}</h3>
<p>${card.date}</p>
<p>${card.description}</p>
<p>Costo: ${card.price}</p>
</div> 
</section> 
</a>
`}
)

document.querySelector(".future").innerHTML = future
}
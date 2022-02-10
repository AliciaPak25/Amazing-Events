var data = []; 
var selected = document.querySelector("#categoryselector"); 
const inputSearch = document.querySelector("#searchInput"); 
var selector = "" 
var input = "" 
var categoriaArray = [];
var selectCapture = "no seleccionada"

async function getData(){ 
await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json()) 
    .then(json => data.push(...json.eventos)) 
    displayCard(data) 
}
console.log(getData)

function displayCard(searching){ 
    
        var toDisplayCard = []  
        if (searching == undefined){
           toDisplayCard.push(...searching) 
        } else {
         toDisplayCard.push(...searching)}
    
var html = "" 
    
    categories = data.map(dato => dato.category)
    unique = new Set(categories)
    categoriaArray = [...unique]
    
toDisplayCard.map(card =>{ 
    html +=  
    ` 
        <div class="events">
        <section class="cards">
            <img src="${card.image}" alt="avengers" class="photos">
            <div class="divpes">
            <h3>${card.name}</h3>
            <p><span>${card.date}</span></p>
            <p>${card.description}</p>
            <a href="/detalle.html?id=${card.id}" class="category">${card.category}👆🏼</a>
            </div>
        </section>
        </div>
    `
  

})
document.querySelector(".events").innerHTML = html 
select()  
}getData() 

function select () {
    categories = data.map(dato => dato.category)
    unique = new Set(categories)
    categoriaArray = [...unique]

    var selectHTML = "" 
    
    categoriaArray.map(elemento => {
        selectHTML +=  `<option value="${elemento}">${elemento}</option>}`
       
   })
   selected.innerHTML = selectHTML
    selected.insertAdjacentHTML("afterbegin", `<option value="no seleccionada">-- Seleccione una categoría --</option>`)
}

function search(event){ 
    var val = event.target.value 
    input = val 
    var searching = []
    if (selectCapture !== "no seleccionada"){ 
        searching.push(...data.filter(card => card.name.toLowerCase().includes(val.toLowerCase()) && card.category === selectCapture) )
    } else {searching = data.filter(card => card.name.toLowerCase().includes(val.toLowerCase())) }
   
 console.log(searching) 
   displayCard(searching) 
}

function selecting (event){ 
    var val = event.target.value 
    var select; 
    selector = val 
    console.log(selector)
    if(input !== ""){ 
        if (selector == "no seleccionada"){
            select = data.filter(card => card.name.toLowerCase().includes(input.toLowerCase())) 
        } else {select = data.filter(card => card.name.toLowerCase().includes(input.toLowerCase()) && card.category === val)} 
    }else { 
        if (selector == "no seleccionada"){  
           select = data 
        }else {select = data.filter(card => card.category === val)} 
   
   displayCard(select) 
} 

} 

inputSearch.addEventListener("keyup",search) 
selected.addEventListener("change", selecting) 


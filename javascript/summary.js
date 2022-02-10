//Zona de declaracion de variables
const elementoMayor = document.querySelector("#mayor")
const elementoMenor = document.querySelector("#menor")
var categorias = document.querySelector("#Categoria")
var audiencia = document.querySelector("#ingreso")
var porcentajeCat = document.querySelector("#porcentajeCategorias")
var capacidadId = document.querySelector("#capacidad")
var datos = [];
var mayorAudiencia = [];
var menorAudiencia = [];
var mayorCapacidad = [];
var ingresoPorCategorias = [];
var porcentajePorCategorias = [];
var categoriaArray = [];
var pastEvents = [];
var incomeCalculation = [];

//Funcion getData
async function getData(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json => {datos.push(...json.eventos),
                    presentDate = json.fechaActual})
    
    categoriaArray = datos.map(dato => dato.category)
    categoriaArray = new Set(categoriaArray)
    categoriaArray = [...categoriaArray]


    PorcentajesAudiencia()
    Capacidad()
    ingresoXCategoria()
    updateDisplay ()


}
getData()

function PorcentajesAudiencia(){
    var array = [];

    array.push(...datos)

    array.map(element => {
        element.datoporcentaje = ((element.assistance * 100) / element.capacity).toFixed(0) 
    })
    let otroArray = [];
    otroArray.push(...array.filter(card => card.assistance))
    otroArray.sort((a, b)=> b.datoporcentaje - a.datoporcentaje)
   console.log(otroArray)
    mayorAudiencia = otroArray[0]
      
    menorAudiencia = otroArray[otroArray.length -1]

}
function Capacidad(){
    var arrayCategory = [];

    arrayCategory.push(...datos)
   

    arrayCategory.map(element => {
        element.datoCapacidad = element.capacity 
    })
    let array2 = []
    array2.push(...arrayCategory.filter(event => event.capacity))
    array2.sort((a, b)=> b.datoCapacidad - a.datoCapacidad)
    
    mayorCapacidad = array2[0]
   
}
function ingresoXCategoria(){
    let categories = datos.map(event => event.category)
    pastEvents = datos.filter(event => event.date < presentDate)
    
    onlyCategories = new Set(categories)
    onlyCategories = [...onlyCategories]
    let repeatedEvents = [];
    totalAttendance = 0
    totalCapacity = 0
    let totalRevenue = 0
    let pastCategories = ""
   
    console.log(onlyCategories)
    onlyCategories.forEach(pastCard => {
        repeatedEvents = pastEvents.filter(event => event.category == pastCard)
        
        repeatedEvents.forEach(pastEvent => {
            pastCategories = pastEvent.category
            totalRevenue = totalRevenue + pastEvent.assistance * pastEvent.price
            totalAttendance = totalAttendance + pastEvent.assistance
            totalCapacity = totalCapacity + pastEvent.capacity
            })
            incomeCalculation.push({pastIncome: pastCategories,
                                    ingreso: totalRevenue,
                                    capacity: totalCapacity,
                                    assistance: totalAttendance
                                    })
            totalRevenue = 0
            totalAttendance = 0
            totalCapacity = 0                 
           
        })
}

function updateDisplay () {
    //todas las categorias
    var html = ""

    categoriaArray.map(data =>{
       
       html += 
       `
       <th>${data}</th>
       `
       var th = document.createElement("th")
       categorias.appendChild(th)
       th.append(data)
        

    
    }) 
    //ingreso por categorias
    
    incomeCalculation.map(data =>{
     
       audiencia.innerHTML +=
        `
        <td>$${data.ingreso}</td>
        ` 
    
    })
    //porcentaje de asistencia por categorias
  
    incomeCalculation.map(data =>{
       
        porcentajeCat.innerHTML +=
        `
        <td>${((data.assistance * 100) / data.capacity).toFixed(0)}%</td>
        `
      
    })
    //evento con mayor % de audiencia
    html = ""
        html +=
        `
        <td>${mayorAudiencia.name}</td>
        `
        var td4 = document.createElement("td")
        elementoMayor.append(td4)
        td4.append(mayorAudiencia.name)

    html = ""
        html +=
        `
        <td>${mayorAudiencia.datoporcentaje}%</td>
        `
        var td5 = document.createElement("td")
        elementoMayor.append(td5)
        td5.append(mayorAudiencia.datoporcentaje)
    //evento con menor % de audiencia
    html = ""
        html +=
        `
        <td>${menorAudiencia.name}</td>
        `
        var td6 = document.createElement("td")
        elementoMenor.append(td6)
        td6.append(menorAudiencia.name)

    html = ""
        html +=
        `
        <td>${menorAudiencia.datoporcentaje}%</td>
        `
        var td7 = document.createElement("td")
        elementoMenor.append(td7)
        td7.append(menorAudiencia.datoporcentaje)
    //evento con mayor capacidad
    html = ""
        html +=
        `
        <td>${mayorCapacidad.name}</td>
        `
        var td8 = document.createElement("td")
        capacidadId.append(td8)
        td8.append(mayorCapacidad.name)

    html = ""
        html +=
        `
        <td>${mayorCapacidad.datoCapacidad}</td>
        `
        var td9 = document.createElement("td")
        capacidadId.append(td9)
        td9.append(mayorCapacidad.datoCapacidad)
    }
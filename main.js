// https://randomuser.me/api/

const leftData = document.querySelector(".left-data")
const rightData = document.querySelector(".right-data")
const btnCreateNewPerson = document.querySelector(".create-person")
const btnMillionaries = document.querySelector(".millionaries")
const btnDoubleMoney = document.querySelector(".btn-double-money")
const btnSort = document.querySelector(".sort")
const btnCalculate = document.querySelector(".calculate-money")

let data =[]

async function createNewPerson(){
    const req = await fetch (`https://randomuser.me/api/`)
    const res = await req.json()
    const NewPerson = {}
    NewPerson.name = `${res.results[0].name.first} ${res.results[0].name.last}`
    NewPerson.wealth =(Math.random() * 1000000).toFixed(2) 
    data.push(NewPerson)
    rendertoDom()
    

}
createNewPerson()

btnCreateNewPerson.addEventListener("click", function(){
    createNewPerson()
})

function rendertoDom(){
    leftData.innerHTML = ""
    rightData.innerHTML = ""
 data.forEach(person=>{
    //  console.log (person)
    const nameElement = document.createElement ('h3')
    const wealthElement = document.createElement ('h3')
    nameElement.innerText = person["name"]
    wealthElement.innerText = person["wealth"]
    leftData.appendChild(nameElement)
    rightData.appendChild(wealthElement)
 })
}

btnDoubleMoney.addEventListener('click', function (){
    data = data.map(person =>{
        person.wealth = (person.wealth *2).toFixed(2)
        return person
        
    })
    rendertoDom()
})

btnMillionaries.addEventListener("click", function(){
    data = data.filter(person=> person.wealth>=1000000)  
     rendertoDom()
    })


btnSort.addEventListener("click", function(){
    const sortData = data.sort((a, b) =>{
       return b.wealth - a.wealth
       
    })
    rendertoDom()
})

btnCalculate.addEventListener("click", function(){
    const summ = data.reduce((acc, el) => acc + Number(el.wealth),0)
        const totalElement = document.createElement("h3")
        totalElement.innerText = summ.toFixed(2)
        rightData.appendChild(totalElement)

})

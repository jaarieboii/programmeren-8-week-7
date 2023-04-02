const nn = ml5.neuralNetwork({ task: 'regression', debug: false })

// let minMemory = 4000
// let maxMemory = 0
// let minPrice = 4000
// let maxPrice = 0
// let minBattery = 4000
// let maxBattery= 0

const horsepower = document.getElementById('fieldhp')
const weight = document.getElementById('fieldwg')
const cylinders = document.getElementById('fieldcy')

nn.load('./model/model.json', modelLoaded)

function modelLoaded () {
    Papa.parse("../training-side/data/cars.csv", {
        download:true,
        header:true, 
        dynamicTyping:true,
        complete: results => processData(results.data)
    })
}
function processData(data) {
    console.log(data)
    // for (let car of data) {
    
    // }
}

async function makePrediction() {
    let hp = parseInt(horsepower.value)
    let wg = parseInt(weight.value)
    let cy = parseInt(cylinders.value)

    const results = await nn.predict({ memory: hp, price: wg, battery: cy })
    
    console.log(`Geschat verbruik: ${results[0].mpg}`)
    document.getElementById('result').innerHTML = `De geschatten miles per gallon afgerond op twee decimalen: ${parseFloat(results[0].mpg).toFixed(2)}`
}

document.getElementById('btn').addEventListener('click', makePrediction)
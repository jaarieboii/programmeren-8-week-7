const nn = ml5.neuralNetwork({ task: 'regression', debug: false })

const horsepower = document.getElementById('fieldhp')
const weight = document.getElementById('fieldwg')
const cylinders = document.getElementById('fieldcy')

nn.load('./model/model.json', console.log("model Loaded"))

async function makePrediction() {
    let hp = parseInt(horsepower.value)
    let wg = parseInt(weight.value)
    let cy = parseInt(cylinders.value)
    
    if(hp >= 0 && wg >= 0 && cy >= 0 ) {
        const results = await nn.predict({ horsepower: hp, weight: wg, cylinders: cy })
        console.log(`Geschat verbruik: ${results[0].mpg}`)
        document.getElementById('result').innerHTML = `De geschatten miles per gallon afgerond op twee decimalen: ${parseFloat(results[0].mpg).toFixed(2)}`
    } else {

        document.getElementById('result').innerHTML = `Niet alles ingevuld, probeer het nog een keer.`
    
    }


}

document.getElementById('btn').addEventListener('click', makePrediction)
import { createChart, updateChart } from "./scatterplot.js"

const nn = ml5.neuralNetwork({ task: 'regression', debug: true })

const field = document.getElementById("field")

function loadData(){
        Papa.parse("./data/cars.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => checkData(results.data)
        })
    }

function checkData(data) {
        console.table(data)
        data.sort(() => (Math.random() - 0.5))

        let trainData = data.slice(0, Math.floor(data.length * 0.8))
        let testData = data.slice(Math.floor(data.length * 0.8) + 1)

        for(let car of trainData){
                nn.addData({ 
                        horsepower: car.horsepower
                }, {mpg:car.mpg})
        }
        //normalize Data and start training
        nn.normalizeData()
        nn.train({ epochs: 10 }, () => finishedTraining())
        
        //draw scatterplot
        const chartdata = data.map(car => ({
                x: car.horsepower,
                y: car.mpg,
            }))
        console.log(chartdata)
        createChart(chartdata, "Horsepower", "MPG")
}


async function finishedTraining() {
        let predictions = [];

        for (let hp = 40; hp < 250; hp += 2) {
                const pred = await nn.predict({ horsepower: hp });
                predictions.push({ x: hp, y: pred[0].mpg });
              }

        console.log("updated")
        updateChart("Predictions", predictions)
}

async function makePrediction() {
        let valueInt = parseInt(field.value)
        const results = await nn.predict({ horsepower: valueInt })
        console.log(`Geschat verbruik: ${results[0].mpg}`)
        document.getElementById('result').innerHTML = `De geschatten miles per gallon afgerond op twee decimalen: ${parseFloat(results[0].mpg).toFixed(2)}`
}

function saveModel() {
        nn.save()
}

document.getElementById('btn').addEventListener('click', makePrediction)

document.getElementById('save').addEventListener('click', saveModel)

loadData()


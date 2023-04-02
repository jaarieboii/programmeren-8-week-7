import { createChart, updateChart } from "./scatterplot.js"

const nn = ml5.neuralNetwork({ task: 'regression', debug: true })

//
// demo data
//

function loadData(){
        Papa.parse("./data/cars.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => checkData(results.data)
        })
    }

function checkData(data) {
        const chartdata = data.map(car => ({
                x: car.horsepower,
                y: car.mpg,
            }))
        console.log(chartdata)
        createChart(chartdata, "Horsepower", "MPG")

        // shuffle
        data.sort(() => (Math.random() - 0.5))

        // een voor een de data toevoegen aan het neural network
        for (let car of data) {
        nn.addData({ horsepower: car.horsepower }, { mpg: car.mpg })
        }

        // normalize
        nn.normalizeData()
        startTraining()
}

function startTraining() {
        nn.train({ epochs: 20 }, () => finishedTraining()) 
}


async function finishedTraining() {
        let predictions = []
        for (let hp = 40; hp < 250; hp += 2) {
                const pred = await nn.predict({horsepower: hp})
                predictions.push({x: hp, y: pred[0].mpg})
        }
        updateChart("Predictions", predictions)
}

async function makePrediction() {
        const results = await nn.predict({ horsepower: 60 })
        console.log(`Geschat verbruik: ${results[0].mpg}`)
}



loadData()
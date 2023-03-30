import { createChart, updateChart } from "./scatterplot.js"

const nn = ml5.neuralNetwork({ task: 'regression', debug: true })

function loadData(){
        Papa.parse("./data/mobilephones.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => checkData(results.data)
        })
    }

function checkData(data) {
    console.table(data)
        // const chartdata = data.map(car => ({
        //         x: car.horsepower,
        //         y: car.mpg,
        //     }))
        // console.log(chartdata)
        // createChart(chartdata, "Horsepower", "MPG")

        // // shuffle
        // data.sort(() => (Math.random() - 0.5))

        // // een voor een de data toevoegen aan het neural network
        // for (let car of data) {
        // nn.addData({ horsepower: car.horsepower }, { mpg: car.mpg })
        // }

        // // normalize
        // nn.normalizeData()
        // startTraining()
}

function startTraining() {
        nn.train({ epochs: 10 }, () => finishedTraining()) 
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


// const data = [
//         { horsepower: 130, mpg: 18 },
//         { horsepower: 165, mpg: 15 },
//         { horsepower: 225, mpg: 14 },
//         { horsepower: 97, mpg: 18 },
//         { horsepower: 88, mpg: 27 },
//         { horsepower: 193, mpg: 9 },
//         { horsepower: 80, mpg: 25 },
// ]



// kijk hoe de data eruit ziet
// console.log(chartdata)

// chartjs aanmaken

loadData()
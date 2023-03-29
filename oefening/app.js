import { createChart, updateChart } from "./scatterplot.js"

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
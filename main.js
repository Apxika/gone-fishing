const prompt = require('prompt-sync')({sigint: true})

let caught = []
let hour = 6
let newFish = genFish()

console.log(`\nYou've gone fishing! Try to maximize the value of your caught fish. You can fish
for six hours (till 12:00pm) and can catch at most 10 lbs of fish.`)
console.log('\n==========================================')

for (let i = 0; i < hour; i++) {
        console.log(`\nThe time is ${6+i}:00am. So far you've caught:`)
        console.log(`${caught.length} fish, ${totalWeight()} lbs, $${totalValue()}`)
        console.log(`\nYou caught a ${newFish.name} weighing ${newFish.weight} lbs and valued at $${newFish.value}`)
        console.log(`\nYour action: [c]atch or [r]elease the fish?`)
        let choice = prompt(`> `)
        let over10lbs = newFish.weight + totalWeight()
        while (choice !== 'c' && choice !== 'r') {
            console.log(`\nInvalid. Choose C for catch or R for release`)
            choice = prompt(`> `)
        }
        if(choice === 'c' && over10lbs <= 10) {
            caught.push(newFish)
            console.log(`\nYou chose to keep the fish.`)
            console.log(`\n==========================================`)
        }   else if(choice === 'c' && over10lbs > 10) {
            console.log(`\nYou cannot exceed 10lbs! Releasing fish`)
            console.log(`\n==========================================`)
        }   else if(choice === 'r') {
            console.log(`\nYou chose to release the fish.`)
            console.log(`\n==========================================`)
        }
        newFish = genFish()
        if(i === 5) {
            console.log(`\nThe time is 12:00pm. Times up!`)
            console.log(`\nYou caught ${caught.length} fish:`)
            for(let i = 0; i < caught.length; i++) {
                console.log(`* ${caught[i].name}, ${caught[i].weight}, ${caught[i].value}`)
            }
            console.log(`\nTotal weight: ${totalWeight()}lbs`)
            console.log(`Total value: $${totalValue()}`)
        }
}

function genWeight(){
    return Number((Math.random()*4).toFixed(2))
}

function genValue(){
    return Math.ceil((Math.random() * 40) + 15)
}

function genName(){
    let fishArr = ['Grouper', 'Bass', 'Tilapia', 'Cod', 'Catfish',]
    let fishAdjArr = ['Scaly', 'Lively', 'Jumpy', 'Scared', 'Angry']
    let fishTypeArr = ['Vibrant', 'Dark', 'Bright', 'Orange', 'Shiny']
    let fishName = fishArr[Math.floor(Math.random() * fishArr.length)]
    let fishAdj1 = fishAdjArr[Math.floor(Math.random() * fishArr.length)]
    let fishAdj2 = fishTypeArr[Math.floor(Math.random() * fishArr.length)]
    return  fishAdj1 + ' ' + fishAdj2 + ' ' + fishName
}

function genFish(){
    let fish = {
        weight: 0,
        value: 0,
        name: ''
    }
    fish.weight = genWeight()
    fish.value = genValue()
    fish.name = genName()
    return fish
}

function totalWeight(){
    let totalW = 0
    for (let i = 0; i < caught.length; i++) {
        totalW += caught[i].weight
    }
    return totalW
}

function totalValue(){
    let totalV = 0
    for (let i = 0; i < caught.length; i++) {
        totalV += caught[i].value
    }
    return totalV
}
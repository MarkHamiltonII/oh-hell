const dummyRound = {
    "round": "",
    "bid": 2,
    "tricks": 3
}

function getGoingDown(startingValue){
    let rounds = []
    for (let i = startingValue; i > 0; i--){
        let newRound = {...dummyRound}
        newRound.round = `${i}d`
        rounds.push(newRound)
    }
    return rounds
}

function getGoingUp(endingValue){
    let rounds = []
    for (let i = 1; i <= endingValue; i++){
        let newRound = {...dummyRound}
        newRound.round = `${i}u`
        rounds.push(newRound)
    }
    return rounds
}

export function getRounds(roundId) {
    switch(roundId){
        case "10down":
            return getGoingDown(10)
        case "10up":
            return getGoingUp(10)
        case "10both":
            return [...getGoingDown(10), ...getGoingUp(10)]
        case "8down":
            return getGoingDown(8)
        case "8up":
            return getGoingUp(8)
        case "8both":
            return [...getGoingDown(8), ...getGoingUp(8)]
        default:
            return [...getGoingDown(10), ...getGoingUp(10)]
    }
}

export const RoundOptions = ["10both","10down","10up","8both","8down","8up"]

'use client'
import { useEffect, useState } from "react";
import Frame from "./components/Frame";
import DummyPlayer from "./data-structure/DummyPlayer";
import SelectDropdown from "./components/SelectDropdown";
import { RoundOptions, getRounds } from "./data-structure/RoundOptions";


export default function Home() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [game, setGame] = useState([DummyPlayer])
  const [updateGame, setUpdateGame] = useState(false)

  function updateNumberOfPlayers(e) {
    e.preventDefault()
    const players = Number(e.target.value)
    setNumberOfPlayers(players)

    if (isNaN(players) || game.length === players) {
      return
    }

    const newGame = [...game]
    while (newGame.length < players) {
      let newPlayer = { ...DummyPlayer }
      newPlayer.id = newGame.length + 1
      newGame.push(newPlayer)
    }
    while (newGame.length > players) {
      newGame.pop()
    }
    setGame(newGame)
    setUpdateGame(true)
  }

  function updateNumberofRounds(e) {
    e.preventDefault()
    const rounds = getRounds(e.target.value)
    let newGame = []
    for (let player in game) {
      let newPlayer = game[player]
      newPlayer.rounds = rounds
      newGame.push(newPlayer)
    }
    setGame(newGame)
    setUpdateGame(true)
  }

  function getScore(bid, tricks) {
    if (isNaN(bid) || isNaN(tricks)) {
      return null
    }

    if (bid === tricks) {
      return bid + 10
    }

    return tricks
  }

  function getTotalScore(player) {
    let score = 0
    for (let round in player.rounds) {
      const r = player.rounds[round]
      const roundScore = getScore(r.bid, r.tricks)
      score += roundScore
    }
    return score
  }

  if (updateGame) {
    let newGame = []
    for (let player in game) {
      const updatedScore = getTotalScore(game[player])
      const newPlayer = {...game[player], score: updatedScore}
      newGame.push(newPlayer)
    }
    setGame(newGame)
    setUpdateGame(!updateGame)
  }

  return (
    <div className="min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">OH HELL! Scorecard</h1>
        <div className=" flex justify-evenly">
          <SelectDropdown label={"How many players?"} changeHandler={updateNumberOfPlayers} placeHolder={"Players"} />
          <SelectDropdown label={"# of rounds"} changeHandler={updateNumberofRounds} options={RoundOptions} placeHolder={"Rounds"} />
        </div>
      </div>
      <main className="flex align-top ">
        {game.map(player => {
          return (
            <table id="scorecard-table" className="scorecard border-collapse mx-auto " cellPadding={'1'} cellSpacing={'0'}>
              <tr>
                <th>{player.name}</th>
              </tr>
              {player.rounds.map(r => {
                return (
                  <Frame bid={r.bid} tricks={r.tricks} />
                )
              })}
              <tr>
                <td>score</td>
                <td>{player.score}</td>
              </tr>
            </table>
          )
        })}
      </main>
    </div>
  )
}

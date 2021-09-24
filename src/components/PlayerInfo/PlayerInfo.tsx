import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { render } from '@testing-library/react'
import ReactDOM from 'react-dom'


export async function getPlayerInfo(fullName: string) {

  console.log('playerID')
  // This grabs playerID from form with input Full Name
  let response = await axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`)
  let playerID = response.data.search_player_all.queryResults.row.player_id


  // This uses playerID and calls API for player info
  let info = await axios.get(`http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${playerID}'`)
  console.log(info.data.player_info.queryResults.row)
  let queryInfo = info.data.player_info.queryResults.row

  // Attaches playerName
  let playerName = queryInfo.name_display_first_last

  // Attaches birthCity
  let birthCity = queryInfo.birth_city

  // Attaches birthState
  let birthState = queryInfo.birth_state

  // Attaches birthCountry
  let birthCountry = queryInfo.birth_country

  // Attaches position
  let position = queryInfo.position

  // Attaches college
  let college = queryInfo.college

  // Attaches throws
  let throws = queryInfo.throws

  // Attaches bats
  let bats = queryInfo.bats


  const DOM_Elements = {
    player_info: '.player-table',
}



  return(
    queryInfo
  )
    // document.querySelector('#root').insertAdjacentHTML('beforeend', playerTable)
 }




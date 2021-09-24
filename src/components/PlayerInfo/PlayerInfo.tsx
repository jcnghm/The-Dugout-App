import React, {useState, useEffect} from 'react'
import axios from 'axios'



export async function getPlayerInfo(fullName: string) {

  console.log('playerID')
  // This grabs playerID from form with input Full Name
  let response = await axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`)
  let playerID = response.data.search_player_all.queryResults.row.player_id

  // This uses playerID and calls API for player info data
  let info = await axios.get(`http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${playerID}'`)
  console.log(info.data.player_info.queryResults.row)
  let queryInfo = info.data.player_info.queryResults.row

  // This uses playerID and calls API for career hitting data
  let hitting = await axios.get(`http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='${playerID}'`)
  let hittingInfo = hitting.data.sport_career_hitting.queryResults.row
  
  // This uses playerID and calls API for career pitching data
  let pitching = await axios.get(`http://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id='${playerID}'`)
  let pitchingInfo = pitching.data.sport_career_pitching.queryResults.row

  
  return(
    queryInfo
  )
  }
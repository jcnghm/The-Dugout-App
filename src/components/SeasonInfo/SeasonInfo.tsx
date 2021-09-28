import React from 'react'
import axios from 'axios'


// Table 1 Projected Season Pitching Stats Function
export async function getProjectedSeason(fullName:string, season:string) {
  // This grabs playerID from form with input Full Name
  let response = await axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`)
  let playerID = response.data.search_player_all.queryResults.row.player_id
  
  // This uses playerID and calls API for projected pitching data by season
  let projected = await axios.get(`http://lookup-service-prod.mlb.com/json/named.proj_pecota_pitching.bam?season='${season}'&player_id='${playerID}'`)
  let projectedPitching = projected.data.proj_pecota_pitching.queryResults.row

  return(
    projectedPitching
  )
}

// Table 2 Pitching Stats Function
export async function getSeasonPlayerPitching(fullName: string, season: string) {

  // This grabs playerID from form with input Full Name
  let response = await axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`)
  let playerID = response.data.search_player_all.queryResults.row.player_id

  // This uses playerID and calls API for pitching data
  let pitching = await axios.get(`http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${season}'&player_id='${playerID}'`)
  let seasonpitchingInfo = pitching.data.sport_pitching_tm.queryResults.row
  console.log(seasonpitchingInfo)

  return(
    seasonpitchingInfo
  )
}
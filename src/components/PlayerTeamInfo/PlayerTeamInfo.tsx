import React from 'react'
import axios from 'axios'


// Table 1 Projected Season Pitching Stats Function
export async function getPlayerTeam(fullName:string, season:string) {
  // This grabs playerID from form with input Full Name
  let response = await axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`)
  let playerID = response.data.search_player_all.queryResults.row.player_id
  
  // This uses playerID and calls API for projected pitching data by season
  let playerteam = await axios.get(`http://lookup-service-prod.mlb.com/json/named.player_teams.bam?season='${season}'&player_id='${playerID}'`)
  let playerteaminfo = playerteam.data.player_teams.queryResults.row
  console.log(playerteaminfo)
    if (playerteaminfo === undefined) {
      let playerteaminfo = {
        league_full: `No data for ${season} season.`,
        team: '',
        start_date: '',
        primary_position: '',
        jersey_number: '',
        forty_man_sw:'',
        status:'',
        team_abbrev:'',
        league:'',
      }
      return(playerteaminfo)
    }else{
    return(
      playerteaminfo
    )
  }
}

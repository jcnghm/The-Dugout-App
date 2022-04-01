import React from "react";
import axios from "axios";

// Table 1 General Info Function
export async function getPlayerInfo(fullName: string) {
  // This grabs playerID from form with input Full Name
  let response = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`
  );
  let playerID = response.data.search_player_all.queryResults.row.player_id;

  // This uses playerID and calls API for player info data
  let info = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${playerID}'`
  );
  console.log(info.data.player_info.queryResults.row);
  let queryInfo = info.data.player_info.queryResults.row;
  if (queryInfo === undefined) {
    let queryInfo = {
      name_display_first_last: "",
      birth_city: "",
      birth_state: "",
      birth_country: "",
      age: "",
      name_nick: "",
      team_name: "",
      college: "",
      throws: "",
      bats: "",
      pro_debut_date: "",
      height_feet: "",
      height_inches: "",
      weight: "",
      high_school: "",
    };
    return queryInfo;
  } else {
    return queryInfo;
  }
}

// Table 2 Hitting Stats Function
export async function getPlayerHitting(fullName: string) {
  // This grabs playerID from form with input Full Name
  let response = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`
  );
  let playerID = response.data.search_player_all.queryResults.row.player_id;

  // This uses playerID and calls API for hitting data
  let hitting = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='${playerID}'`
  );
  console.log(hitting.data.sport_career_hitting.queryResults.row);
  let hittingInfo = hitting.data.sport_career_hitting.queryResults.row;
  if (hittingInfo === undefined) {
    let hittingInfo = {
      avg: "",
      h: "",
      obp: "",
      slg: "",
      ops: "",
      rbi: "",
      hr: "",
      so: "",
      bb: "",
      ab: "",
      gidp: "",
      go: "",
      go_ao: "",
      hbp: "",
      hfly: "",
      hgnd: "",
      ppa: "",
      tpa: "",
      r: "",
      roe: "",
      sb: "",
      xbh: "",
    };
    return hittingInfo;
  } else {
    return hittingInfo;
  }
}

// Table 3 Pitching Stats Function
export async function getPlayerPitching(fullName: string) {
  // This grabs playerID from form with input Full Name
  let response = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`
  );
  let playerID = response.data.search_player_all.queryResults.row.player_id;

  // This uses playerID and calls API for pitching data
  let pitching = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id='${playerID}'`
  );
  console.log(pitching.data.sport_career_pitching.queryResults.row);
  let pitchingInfo = pitching.data.sport_career_pitching.queryResults.row;
  if (pitchingInfo === undefined) {
    let pitchingInfo = {
      era: "No Pitching Data",
      so: "",
      bb: "",
      kbb: "",
      k9: "",
      whip: "",
      ip: "",
      sv: "",
      w: "",
      l: "",
      bb9: "",
      bk: "",
      er: "",
      h: "",
      h9: "",
      hr9: "",
      obp: "",
      ops: "",
      slg: "",
      wpct: "",
      svo: "",
      cg: "",
    };
    return pitchingInfo;
  } else {
    return pitchingInfo;
  }
}

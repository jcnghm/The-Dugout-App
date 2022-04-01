import React from "react";
import axios from "axios";

// Table 1 Projected Season Pitching Stats Function
export async function getProjectedSeason(fullName: string, season: string) {
  // This grabs playerID from form with input Full Name
  let response = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`
  );
  let playerID = response.data.search_player_all.queryResults.row.player_id;

  // This uses playerID and calls API for projected pitching data by season
  let projected = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.proj_pecota_pitching.bam?season='${season}'&player_id='${playerID}'`
  );
  let projectedPitching = projected.data.proj_pecota_pitching.queryResults.row;
  console.log(projectedPitching);
  if (projectedPitching === undefined) {
    let projectedPitching = {
      era: "",
      so: "",
      bb: "",
      kbb: "",
      k9: "",
      whip: "",
      ip: "",
      sv: "",
      w: "",
      l: "",
      season: `No data for ${season}`,
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
    return projectedPitching;
  } else {
    return projectedPitching;
  }
}

// Table 2 Pitching Stats Function
export async function getSeasonPlayerPitching(
  fullName: string,
  season: string
) {
  // This grabs playerID from form with input Full Name
  let response = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`
  );
  let playerID = response.data.search_player_all.queryResults.row.player_id;

  // This uses playerID and calls API for pitching data
  let pitching = await axios.get(
    `https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${season}'&player_id='${playerID}'`
  );
  let seasonpitchingInfo = pitching.data.sport_pitching_tm.queryResults.row;
  console.log(seasonpitchingInfo);
  if (seasonpitchingInfo === undefined) {
    let seasonpitchingInfo = {
      era: "",
      so: "",
      bb: "",
      kbb: "",
      k9: "",
      whip: "",
      ip: "",
      sv: "",
      w: "",
      l: "",
      season: `No data for ${season}`,
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
    return seasonpitchingInfo;
  } else {
    return seasonpitchingInfo;
  }
}

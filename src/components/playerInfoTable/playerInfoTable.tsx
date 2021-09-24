import React, { useState, useEffect, FormEvent, Component } from "react";
import { makeStyles, Button } from '@material-ui/core';
import {Dashboard, playerprops} from '../Dashboard'
import {getPlayerInfo} from '../PlayerInfo'


export interface TableProps {
    name_display_first_last: string
    birth_city: string
    birth_state: string
    birth_country: string
    position: string
    college: string
    throws: string
    bats: string
}

export const PlayerInfoTable = async (props: playerprops) => {

        const [playerTableInfo, setplayerTableInfo] = useState<TableProps>(
            {
                name_display_first_last: 'Clayton Kershaw',
                birth_city: "Dallas",
                birth_state: "Texas",
                birth_country: "USA",
                position: "Pitcher",
                college: "High School",
                throws: "Left",
                bats: "Left"
            }
        )
        setplayerTableInfo(await getPlayerInfo(props.playername))
    
    
return(

    `<div>
        <table>
            <tr>
                <th>Name</th>
                <th>Birthplace</th>
                <th>Position</th>
                <th>College</th>
                <th>Throws</th>
                <th>Bats</th>
            </tr>
            <tr>
                <td>${playerTableInfo.name_display_first_last}</td>
                <td>${playerTableInfo.birth_city}, ${playerTableInfo.birth_state}, ${playerTableInfo.birth_country}</td>
                <td>${playerTableInfo.position}</td>
                <td>${playerTableInfo.college}</td>
                <td>${playerTableInfo.throws}</td>
                <td>${playerTableInfo.bats}</td>
            </tr>
        </table>
    </div>`
)
}

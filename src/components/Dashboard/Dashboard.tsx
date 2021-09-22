import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {PlayerInfo} from '../PlayerInfo'
import { makeStyles } from '@material-ui/core';
import background_image from '../../assets/images/dashboard_background.jpg'
import logo_image from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import {NavBar} from '../NavBar'
import axios from 'axios'
import { SearchBar } from 'react-native-elements';
import Search from "@material-ui/icons/Search";
import './searchstyles.css'

const useStyles = makeStyles({
    title: {
        fontSize: '30px',
        fontFamily: 'roboto',
    },
    table: {
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        marginTop: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontFamily: 'Playball',
        fontSize: '30px',

    },
    searchForm: {
        width: '300px',
        height: '30px',
        padding: '5px'
    },
    root: {
        padding: '0',
        margin: '0',
        backgroundColor: 'black'
    },
    navbar_container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'centered',
    },
    logo: {
        margin: '0, 0, 0, 0.45rem',
    },
    logoImage: {
        paddingTop: '20px',
        paddingRight: '20px',
        paddingLeft: '10px'
    },
    logo_a: {
        color: 'rgb(28,24,22)',
        fontFamily: 'Playball',
        fontSize: '30px'
    },
    logo_navigation: {
        listStyle: 'none',
        textTransformation: 'uppercase',
        textDecoration: 'none',
        color: 'white',
        marginBottom: '15px',
    },
    navigation: {
        display: 'flex'
    },
    nav_a: {
        display: 'block',
        padding: '1em',
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'Playball',
        fontSize: '20px',
        marginRight: '20px',
        
    },
    main: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background_image});`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute',
    },
    main_text: {
        textAlign: 'center',
        position: 'relative',
        marginTop: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontFamily: 'Playball',
        fontSize: '30px',
    },
    homeText: {
        color: 'white',
    }
})

// Get PlayerID Function

// const getPlayerID = async (fullName: String) => {
//     let response = await axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`)
//     console.log(response.data.search_player_all.queryResults.row.player_id)
//     return response.data.search_player_all.queryResults.row.player_id
// }
// const form = document.querySelector('#player-info')
// form.addEventListener('submit', ( event )  => {
//     event.preventDefault();
//     let fullName = document.querySelector('#fullname');
//     let info = getPlayerID(fullName.value)
//     console.log(info)
// })

// // Get General Player Info

// const getPlayerInfo = async (playerID : String) => {
//     let response = await axios.get(`http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${playerID}'`)
//     console.log(response.data.player_info.queryResults.row)
//     return response.data.player_info.queryResults.row
// }

// const playerInfoForm = async (document.querySelector('#player-info'))
// playerInfoForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     let fullName = document.querySelector('#fullname');
//     let playerID = await getPlayerID(fullName.value)
//     let info = getPlayerInfo(playerID)
//     console.log(info)
//     let data = loadPlayerInfo(info)
//     return data
// })

// const loadPlayerInfo = async (info: string) => {
//     const playerInfo = await info;
//     createPlayerTable(
//         playerInfo.name_display_first_last, playerInfo.birth_city, playerInfo.birth_state, playerInfo.birth_country, 
//         playerInfo.position, playerInfo.college, playerInfo.throws, playerInfo.bats)
// }

// const createPlayerTable = (full_name: string, city: string, state: string, country:string , position: string, college: string, throws: string, bats: string) => {
//     const html = 
//     `<div>
//         <table>
//             <tr>
//                 <th>Name</th>
//                 <th>Birthplace</th>
//                 <th>Position</th>
//                 <th>College</th>
//                 <th>Throws</th>
//                 <th>Bats</th>
//             </tr>
//             <tr>
//                 <td>${full_name}</td>
//                 <td>${city}, ${state}, ${country}</td>
//                 <td>${position}</td>
//                 <td>${college}</td>
//                 <td>${throws}</td>
//                 <td>${bats}</td>
//             </tr>
//         </table>
//     </div>
//     `

//     document.querySelector(DOM_Elements.player_info).insertAdjacentHTML('beforeend', html)

// }
export const Dashboard = () => {

    const classes = useStyles();
    
    return (

        <div className={classes.root}>
            {/* Nav Bar */}
            
            <NavBar/>

            {/* Main Player Stats Table Search Section */}
            <main className={classes.main}>
                <div className={classes.table}>
                    
                    <div >
                        <form className="searchForm">
                            {/* <input
                            
                            placeholder="Player Name"
                            // value={this.state.query}
                            // onChange={this.handleInputChange}
                            /> */}

                            {/* <SearchBar
                                inputStyle={{ backgroundColor: 'white' }}
                                containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
                                placeholderTextColor={'#g5g5g5'}
                                  /> */}
                                  
                        </form>
                            <h1 className = {classes.title}>Player Information</h1>
                        <div className="container">
                            <input id="searchBar" className="searchbar" type="text" placeholder="Enter Player Name..."/>
                            <a id="btnSearch" className="btn-search"><i className="fa fa-search"></i></a>
                        </div>
                     
                         
                    </div>
                </div>
                <div id="player-info">

                </div>
            </main>
        </div>
    )
}
    
const DOM_Elements = {
    player_info: '.player-info'}
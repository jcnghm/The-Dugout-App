import React, { useState, useEffect, FormEvent, Props, Suspense } from "react";
import { makeStyles, Button } from '@material-ui/core';
import background_image from '../../assets/images/dashboard_background.jpg'
import { Link } from 'react-router-dom';
import {NavBar} from '../NavBar'
import axios from 'axios'
import './searchstyles.css'
import {getPlayerInfo} from '../PlayerInfo'
import ReactDOM from 'react-dom'
import {PlayerInfoTable} from '../playerInfoTable'


const useStyles = makeStyles({
    button: {
        backgroundColor: '#00176b', 
        fontFamily:'roboto',
        color: 'white',
        marginLeft: '50px',
        marginTop: '50px'
    },
    title: {
        fontSize: '30px',
        fontFamily: 'roboto',
    },
    table: {
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        marginTop: '16%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: '25px',
        width: "50%",

    },
    output: {
        justifyContent: 'center',
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px",
        textAlign: 'center',
        position: 'relative',
        marginTop: '5%',
        left: '0%',
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: '25px',
        width: "50%",
        border: "1px solid white"
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
    },
    searchbar: {
        fontSize: "10px"
    }
})

export interface playerprops {
    playername: string
}
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

export const Dashboard = () => {

    const classes = useStyles();

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(playerFullName)
        setplayerTableInfo(await getPlayerInfo(playerFullName))
    }

    const [playerFullName, setPlayerName] = useState('')



    
        const [playerTableInfo, setplayerTableInfo] = useState<TableProps>(
            {
                name_display_first_last: '',
                birth_city: "",
                birth_state: "",
                birth_country: "",
                position: "",
                college: "",
                throws: "",
                bats: ""
            }
        )



    return (

        <div className={classes.root}>
            {/* Nav Bar */}
            
            <NavBar/>

            {/* Main Player Stats Table Search Section */}
            <main className={classes.main}>
                <div className={classes.table}>
                    
                    <div >
                        <h1 className = {classes.title}>Player Information</h1>
                        <form name="player-info" id="player-info" onSubmit={submitForm} >
                            <div className="container">
                                <input  value = {playerFullName} name = "fullname" id="fullname" className="searchbar" type="text" onChange={(e) => setPlayerName(e.target.value)}placeholder="Enter Player Name..."/>
                                <Button className = {classes.button} variant="contained" color = "primary" type="submit" >Get Player Info</Button>
                            </div>
                        </form>   
                    </div>
                </div>
                <div id="player-table">
                <Suspense fallback = {<p>Loading</p>}>
                <div>
                        <table className = {classes.table}>
                            <tr>
                                <th className = {classes.output}>Name</th>
                                <th className = {classes.output}>Birthplace</th>
                                <th className = {classes.output}>Position</th>
                                <th className = {classes.output}>College</th>
                                <th className = {classes.output}>Throws</th>
                                <th className = {classes.output}>Bats</th>
                            </tr>
                            <tr>
                                <td className = {classes.output}>{playerTableInfo.name_display_first_last}</td>
                                <td className = {classes.output}>{playerTableInfo.birth_city} {playerTableInfo.birth_state} {playerTableInfo.birth_country}</td>
                                <td className = {classes.output}>{playerTableInfo.position}</td>
                                <td className = {classes.output}>{playerTableInfo.college}</td>
                                <td className = {classes.output}>{playerTableInfo.throws}</td>
                                <td className = {classes.output}>{playerTableInfo.bats}</td>
                            </tr>
                        </table>
                    </div>
                </Suspense>
                </div>
            </main>
        </div>
    )
}
    

// export function Dashboard() {
//     const [playerInfoFound, setInfoFound] = useState([]);
//     const [playerSearch, setPlayerSearch] = useState('');
//     const classes = useStyles();
  
//     const searchForPlayers = async (query: String): Promise<any> => {
//     let response = await axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${fullName}'`)
//     let playerID = response.data.search_player_all.queryResults.row.player_id

//     //   // This uses playerID and calls API for player info
//     let info = await axios.get(`http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${playerID}'`)
//     console.log(info.data.player_info.queryResults.row)
//     let queryInfo = info.data.player_info.queryResults.row

//     //   // Attaches playerName
//     let playerName = queryInfo.name_display_first_last

//     //   // Attaches birthCity
//     let birthCity = queryInfo.birth_city

//     //   // Attaches birthState
//     let birthState = queryInfo.birth_state

//     //   // Attaches birthCountry
//     let birthCountry = queryInfo.birth_country

//     //   // Attaches position
//     let position = queryInfo.position

//     //   // Attaches college
//     let college = queryInfo.college

//     //   // Attaches throws
//     let throws = queryInfo.throws

//     //   // Attaches bats
//     let bats = queryInfo.bats
//         };
  
//     useEffect(() => {
//       (async () => {
//         const query = encodeURIComponent(playerSearch);
//         const response = await searchForPlayers(query);
//         setInfoFound(response);
//       })();
//     }, [playerSearch]);
  
//     const search = (event: FormEvent<HTMLFormElement>) => {
//       event.preventDefault();
//       const form = event.target as HTMLFormElement;
//       const input = form.querySelector('#fullname') as HTMLInputElement;
//       setPlayerSearch(input.value);
//       input.value = '';
//     };
  
//     return (
//         <div className={classes.root}>
//              {/* Nav Bar */}
            
//              <NavBar/>

//              {/* Main Player Stats Table Search Section */}
//              <main className={classes.main}>
//                  <div className={classes.table}>
                    
//                      <div >
//                          <h1 className = {classes.title}>Player Information</h1>
//                          <form name="player-info" id="player-info" onSubmit={event => search(event)}>
//                              <div className="container">
//                                <input name = "fullname" id="fullname" className="searchbar" type="text" placeholder="Enter Player Name..."/>
//                                <Button className = {classes.button} variant="contained" color = "primary" type="submit">Get Player Info</Button>
//                             </div>
//                         </form>   
                     
//                     </div>
//                 </div>
//                 <div id="player-table">

//                      `<div>
//                          <table>
//                              <tr>
//                                  <th>Name</th>
//                                  <th>Birthplace</th>
//                                  <th>Position</th>
//                                  <th>College</th>
//                                  <th>Throws</th>
//                                  <th>Bats</th>
//                              </tr>
//                              <tr>
//                                  <td>${playerName}</td>
//                                  <td>${birthCity}, ${birthState}, ${birthCountry}</td>
//                                  <td>${position}</td>
//                                  <td>${college}</td>
//                                  <td>${throws}</td>
//                                  <td>${bats}</td>
//                              </tr>
//                          </table>
//                     </div>`

//                 </div>
//             </main>
//         </div>);
//   }

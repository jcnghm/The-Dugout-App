import React, { useState,  Suspense } from "react";
import { makeStyles, Button } from '@material-ui/core';
import background_image from '../../assets/images/oracle.jpg'
import { NavBar } from '../NavBar'
import './searchstyles.css'
import { getPlayerTeam } from '../PlayerTeamInfo'

// makeStyles for the Player Stats Season Page

const useStyles = makeStyles({
    button: {
        backgroundColor: '#00176b', 
        fontFamily:'roboto',
        color: 'white',
        marginLeft: '50px',
        marginTop: '50px',
        minWidth: "200px"
    },
    title: {
        fontSize: '40px',
        fontFamily: 'Playball',
        fontWeight: 'normal',
    },
    table_title: {
        color: "white",
        fontFamily: "Playball",
        fontWeight: "normal",
        marginLeft: "2%",
        marginTop: "-20px"
    },
    bootstrap_table: {
        color: "white",
    },
    table: {
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        marginTop: '15%',
        left: '50%',
        transform: 'translate(-50%, -130%)',
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: '25px',
        width: "50%",
        borderRadius: "12px",

    },
    table_output: {
        width: "50%",
        marginLeft: "25%",
    },
    output: {
        paddingLeft: "15px",
        paddingRight: "15px",
        textAlign: 'center',
        position: 'relative',
        marginTop: '10px',
        color: 'white',
        fontFamily: 'Times New Roman',
        fontSize: '18px',
        width: "50%",
        border: "3px solid white",
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
    main: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background_image});`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute',
    },
    searchbar: {
        fontSize: "20px"
    }
})

// Props to pass data to table (Projected vs Actual)

export interface PlayerTeamProps {
    league_full: string
    team: string
    start_date: string
    primary_position: string
}


// Start of Player Stats Dashboard

export const PlayerTeam = () => {

    const classes = useStyles();

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(playerFullName, playerSeason)
        setPlayerTeamTable(await getPlayerTeam(playerFullName, playerSeason))
    }

    const [playerFullName, setPlayerName] = useState('')

    const [playerSeason, setPlayerSeason] = useState('')

    // Default Props for Hitting Data Table
        const [playerTeam, setPlayerTeamTable] = useState<PlayerTeamProps>(
            {
                league_full: '',
                team: '',
                start_date: '',
                primary_position: '',
            }
        )
        
        let start_date = playerTeam.start_date;
        let year = start_date.slice(0,4)
        let month = start_date.slice(6,7)
        let day = start_date.slice(9,10)

    return (

        <div className={classes.root}>

            {/* Nav Bar */}
            
            <NavBar/>

            {/* Main Player Stats Table Search Section */}

            <main className={classes.main}>
                <div className={classes.table}>
                    
                    <div >
                        <h1 className = {classes.title}>Player Teams by Season</h1>
                        <form name="player-info" id="player-info" onSubmit={submitForm} >
                            <div className="container">
                                <input  value = {playerFullName} name = "fullname" id="fullname" className="searchbar" type="text" onChange={(e) => setPlayerName(e.target.value)}placeholder="Enter Player Name..."/>
                                <input  value = {playerSeason} name = "season" id="season" className="searchbar" type="text" onChange={(i) => setPlayerSeason(i.target.value)}placeholder="Enter Season..."/>
                                <Button className = {classes.button} variant="contained" color = "primary" type="submit" >Get Player Info</Button>
                            </div>
                        </form>   
                    </div>
                </div>
            <div id="player-table">
                <Suspense fallback = {<p>Loading</p>}>
                <div>
                        <h1 className = {classes.table_title}>{playerFullName.toUpperCase()} Team Played during {playerSeason}</h1> 
                        <br />
                        <br />

                        <table className = {classes.table_output}>
                            <tr>
                                <th className = {classes.output}>Team</th>
                                <th className = {classes.output}>League</th>
                                <th className = {classes.output}>Primary Position Played</th>
                                <th className = {classes.output}>Date Joined Team</th>
                            </tr>
                    
                            <tr>
                                <td className = {classes.output}>{playerTeam.team}</td>
                                <td className = {classes.output}>{playerTeam.league_full}</td>
                                <td className = {classes.output}>{playerTeam.primary_position}</td>
                                <td className = {classes.output}>{month}/{day}/{year}</td>
                            </tr>
                        </table>


                </div>
                </Suspense>
            </div>
            </main>
     </div>
    )
}
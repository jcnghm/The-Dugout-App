import React, { useState,  Suspense } from "react";
import { makeStyles, Button } from '@material-ui/core';
import background_image from '../../assets/images/signin.jpg'
import { NavBar } from '../NavBar'
import './searchstyles.css'
import { getPlayerTeam } from '../PlayerTeamInfo'
import { Table, Col, Row, Container, Form } from 'react-bootstrap'

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
        color: "white",
        marginLeft: "20px",
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
        transform: 'translate(-50%, -50%)',
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
    jersey_number: string
    forty_man_sw: string
    status: string
    team_abbrev: string
    league: string
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
                jersey_number: '',
                forty_man_sw:'',
                status:'',
                team_abbrev:'',
                league:'',
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
                <h1 className = {classes.title}>{playerFullName.toUpperCase()} teams played: {playerSeason}</h1>
                <Container className="my-auto">
                        <Table striped bordered hover responsive="lg"variant="dark">
                            <thead>
                                <tr>
                                    <th>Team</th>
                                    <th>Team Abbrev</th>
                                    <th>League</th>
                                    <th>League Abbrev</th>
                                    <th>Primary Position Played</th>
                                    <th>Jersey Number</th>
                                    <th>Forty Man Roster</th>
                                    <th>Active</th>
                                    <th>Date Joined Team</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{playerTeam.team}</td>
                                    <td>{playerTeam.team_abbrev}</td>
                                    <td>{playerTeam.league_full}</td>
                                    <td>{playerTeam.league}</td>
                                    <td>{playerTeam.primary_position}</td>
                                    <td>{playerTeam.jersey_number}</td>
                                    <td>{playerTeam.forty_man_sw}</td>
                                    <td>{playerTeam.status}</td>
                                    <td>{month}/{day}/{year}</td>

                                </tr>
                            </tbody>
                        </Table>
                    </Container>
            </main>
     </div>
    )
}
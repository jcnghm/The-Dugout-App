import React, { useState,  Suspense } from "react";
import { makeStyles, Button } from '@material-ui/core';
import background_image from '../../assets/images/baseball.jpg'
import {NavBar} from '../NavBar'
import './searchstyles.css'
import {getSeasonPlayerPitching, getProjectedSeason} from '../SeasonInfo'

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
        marginLeft: "20px",
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
        width: "60%",
        marginLeft: "20%",
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

export interface ProjectedProps {
    era: string
    so: string
    bb: string
    kbb: string
    k9: string
    whip: string
    ip: string
    sv: string
    w: string
    l: string
}

export interface SeasonPitchingProps {
    era: string
    so: string
    bb: string
    kbb: string
    k9: string
    whip: string
    ip: string
    sv: string
    w: string
    l: string
    season: string
}

// Start of Player Stats Dashboard

export const Season = () => {

    const classes = useStyles();

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(playerFullName, playerSeason)
        setProjectedTableInfo(await getProjectedSeason(playerFullName, playerSeason))
        setpitchingTableInfo(await getSeasonPlayerPitching(playerFullName, playerSeason))
    }

    const [playerFullName, setPlayerName] = useState('')

    const [playerSeason, setPlayerSeason] = useState('')

    // Default Props for Hitting Data Table
        const [projectedTableInfo, setProjectedTableInfo] = useState<ProjectedProps>(
            {
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
            }
        )
    // Default Props for Pitching Data Table
        const [pitchingTableInfo, setpitchingTableInfo] = useState<SeasonPitchingProps>(
            {
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
                season: "",
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
                        <h1 className = {classes.title}>Pitching Statistics By Season</h1>
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
                        <h1 className = {classes.table_title}>{pitchingTableInfo.season} Season Stats - Projected vs Actual</h1> 
                        <br />
                        <br />

                        <table className = {classes.table_output}>
                            <tr>
                                <th className = {classes.output}>ERA</th>
                                <th className = {classes.output}>SO</th>
                                <th className = {classes.output}>BB</th>
                                <th className = {classes.output}>KBB</th>
                                <th className = {classes.output}>K/9</th>
                                <th className = {classes.output}>whip</th>
                                <th className = {classes.output}>W</th>
                                <th className = {classes.output}>L</th>
                                <th className = {classes.output}>SV</th>
                                <th className = {classes.output}>IP</th>
                            </tr>
                    
                            <tr>
                                <td className = {classes.output}>{projectedTableInfo.era}</td>
                                <td className = {classes.output}>{projectedTableInfo.so}</td>
                                <td className = {classes.output}>{projectedTableInfo.bb}</td>
                                <td className = {classes.output}>{projectedTableInfo.kbb}</td>
                                <td className = {classes.output}>{projectedTableInfo.k9}</td>
                                <td className = {classes.output}>{projectedTableInfo.whip}</td>
                                <td className = {classes.output}>{projectedTableInfo.w}</td>
                                <td className = {classes.output}>{projectedTableInfo.l}</td>
                                <td className = {classes.output}>{projectedTableInfo.sv}</td>
                                <td className = {classes.output}>{projectedTableInfo.ip}</td>
                            </tr>
                        </table>
<br />
<br />
                        <table className = {classes.table_output}>
                            <tr>
                                <th className = {classes.output}>ERA</th>
                                <th className = {classes.output}>SO</th>
                                <th className = {classes.output}>BB</th>
                                <th className = {classes.output}>KBB</th>
                                <th className = {classes.output}>K/9</th>
                                <th className = {classes.output}>whip</th>
                                <th className = {classes.output}>W</th>
                                <th className = {classes.output}>L</th>
                                <th className = {classes.output}>SV</th>
                                <th className = {classes.output}>IP</th>
                            </tr>
                            <tr>
                                <td className = {classes.output}>{pitchingTableInfo.era}</td>
                                <td className = {classes.output}>{pitchingTableInfo.so}</td>
                                <td className = {classes.output}>{pitchingTableInfo.bb}</td>
                                <td className = {classes.output}>{pitchingTableInfo.kbb}</td>
                                <td className = {classes.output}>{pitchingTableInfo.k9}</td>
                                <td className = {classes.output}>{pitchingTableInfo.whip}</td>
                                <td className = {classes.output}>{pitchingTableInfo.w}</td>
                                <td className = {classes.output}>{pitchingTableInfo.l}</td>
                                <td className = {classes.output}>{pitchingTableInfo.sv}</td>
                                <td className = {classes.output}>{pitchingTableInfo.ip}</td>
                            </tr>
                        </table>

                    </div>
                </Suspense>
                </div>
            </main>
        </div>
    )
}

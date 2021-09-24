import React, { useState,  Suspense } from "react";
import { makeStyles, Button } from '@material-ui/core';
import background_image from '../../assets/images/dashboard_background.jpg'
import {NavBar} from '../NavBar'
import './searchstyles.css'
import {getPlayerInfo} from '../PlayerInfo'
import { Container, Row, Col, Table } from 'react-bootstrap';




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
        fontFamily: 'Tahoma',
    },
    table: {
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        marginTop: '15%',
        left: '50%',
        transform: 'translate(-110%, -60%)',
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: '25px',
        width: "50%",
        borderRadius: "12px",

    },
    table_output: {
        marginBottom: "5%",
        width: "60%",
        marginLeft: "18%",
        transform: 'translate(35%, -200%)',
    },
    output: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "5px",
        paddingBottom: "10px",
        textAlign: 'center',
        position: 'relative',
        marginTop: '5%',
        color: 'white',
        fontFamily: 'Tahoma',
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

export interface TableProps {
    name_display_first_last: string
    birth_city: string
    birth_state: string
    birth_country: string
    age: string
    name_nick: string
    team_name: string
    college: string
    throws: string
    bats: string
}

export interface HittingProps {
    avg: string
    h: string
    obp: string
    slg: string
    ops: string
    rbi: string
    hr: string
    so: string
    bb: string
    ab: string
}

export interface PitchingProps {
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

export const Dashboard = () => {

    const classes = useStyles();

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(playerFullName)
        setplayerTableInfo(await getPlayerInfo(playerFullName))
    }

    const [playerFullName, setPlayerName] = useState('')



    // Default Props for Player Info Table
        const [playerTableInfo, setplayerTableInfo] = useState<TableProps>(
            {
                name_display_first_last: '',
                birth_city: "",
                birth_state: "",
                birth_country: "",
                age: "",
                name_nick: "",
                team_name: "",
                college: "",
                throws: "",
                bats: ""
            }
        )
    // Default Props for Hitting Data Table
        const [hittingTableInfo, sethittingTableInfo] = useState<HittingProps>(
            {
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
            }
        )
    // Default Props for Pitching Data Table
        const [pitchingTableInfo, setpitchingTableInfo] = useState<PitchingProps>(
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
                        <table className = {classes.table_output}>
                            <tr>
                                <th className = {classes.output}>Name</th>
                                <th className = {classes.output}>Birthplace</th>
                                <th className = {classes.output}>Age</th>
                                <th className = {classes.output}>Nickname</th>
                                <th className = {classes.output}>College</th>
                                <th className = {classes.output}>Team Name</th>
                                <th className = {classes.output}>Throws</th>
                                <th className = {classes.output}>Bats</th>
                            </tr>
                            <tr>
                                <td className = {classes.output}>{playerTableInfo.name_display_first_last}</td>
                                <td className = {classes.output}>{playerTableInfo.birth_city} {playerTableInfo.birth_state} {playerTableInfo.birth_country}</td>
                                <td className = {classes.output}>{playerTableInfo.age}</td>
                                <td className = {classes.output}>{playerTableInfo.name_nick}</td>
                                <td className = {classes.output}>{playerTableInfo.college}</td>
                                <td className = {classes.output}>{playerTableInfo.team_name}</td>
                                <td className = {classes.output}>{playerTableInfo.throws}</td>
                                <td className = {classes.output}>{playerTableInfo.bats}</td>
                            </tr>
                        </table>

                        <table className = {classes.table_output}>
                            <tr>
                                <th className = {classes.output}>AVG</th>
                                <th className = {classes.output}>H</th>
                                <th className = {classes.output}>OBP</th>
                                <th className = {classes.output}>SLG</th>
                                <th className = {classes.output}>OPS</th>
                                <th className = {classes.output}>RBI</th>
                                <th className = {classes.output}>HR</th>
                                <th className = {classes.output}>SO</th>
                                <th className = {classes.output}>BB</th>
                                <th className = {classes.output}>AB</th>
                            </tr>
                            <tr>
                                <td className = {classes.output}>{playerTableInfo.name_display_first_last}</td>
                                <td className = {classes.output}>{playerTableInfo.birth_city} {playerTableInfo.birth_state} {playerTableInfo.birth_country}</td>
                                <td className = {classes.output}>{playerTableInfo.age}</td>
                                <td className = {classes.output}>{playerTableInfo.name_nick}</td>
                                <td className = {classes.output}>{playerTableInfo.college}</td>
                                <td className = {classes.output}>{playerTableInfo.team_name}</td>
                                <td className = {classes.output}>{playerTableInfo.throws}</td>
                                <td className = {classes.output}>{playerTableInfo.bats}</td>
                                <td className = {classes.output}>{playerTableInfo.bats}</td>
                                <td className = {classes.output}>{playerTableInfo.bats}</td>
                            </tr>
                        </table>

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
                                <td className = {classes.output}>{playerTableInfo.name_display_first_last}</td>
                                <td className = {classes.output}>{playerTableInfo.birth_city} {playerTableInfo.birth_state} {playerTableInfo.birth_country}</td>
                                <td className = {classes.output}>{playerTableInfo.age}</td>
                                <td className = {classes.output}>{playerTableInfo.name_nick}</td>
                                <td className = {classes.output}>{playerTableInfo.college}</td>
                                <td className = {classes.output}>{playerTableInfo.team_name}</td>
                                <td className = {classes.output}>{playerTableInfo.throws}</td>
                                <td className = {classes.output}>{playerTableInfo.bats}</td>
                                <td className = {classes.output}>{playerTableInfo.bats}</td>
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
    
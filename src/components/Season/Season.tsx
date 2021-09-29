import React, { useState,  Suspense } from "react";
import { makeStyles, Button } from '@material-ui/core';
import background_image from '../../assets/images/baseball.jpg'
import {NavBar} from '../NavBar'
import './searchstyles.css'
import {getSeasonPlayerPitching, getProjectedSeason} from '../SeasonInfo'
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
        transform: 'translate(-50%, -50%)',
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
        fontSize: "20px",
    },
    container: {
        position: "fixed"
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
    season: string
    bb9: string
    bk: string
    er: string
    h: string
    h9: string
    hr9: string
    obp: string
    ops: string
    slg: string
    wpct: string
    svo: string
    cg: string
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
    bb9: string
    bk: string
    er: string
    h: string
    h9: string
    hr9: string
    obp: string
    ops: string
    slg: string
    wpct: string
    svo: string
    cg: string
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
                season: '',
                bb9: '',
                bk: '',
                er: '',
                h: '',
                h9: '',
                hr9: '',
                obp: '',
                ops: '',
                slg: '',
                wpct: '',
                svo: '',
                cg: '',
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
                bb9: '',
                bk: '',
                er: '',
                h: '',
                h9: '',
                hr9: '',
                obp: '',
                ops: '',
                slg: '',
                wpct: '',
                svo: '',
                cg: '',
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
                    <h1 className = {classes.title}>{playerSeason} Projected vs Actual</h1>
                    <Container className="my-auto">
                        <Table striped bordered hover responsive="lg"variant="dark">
                            <thead>
                                <tr>
                                    <th>Season</th>
                                    <th>ERA</th>
                                    <th>ER</th>
                                    <th>SO</th>
                                    <th>BB</th>
                                    <th>BB9</th>
                                    <th>KBB</th>
                                    <th>K/9</th>
                                    <th>BK</th>
                                    <th>H</th>
                                    <th>H/9</th>
                                    <th>HR/9</th>
                                    <th>OBP(against)</th>
                                    <th>SLG(against)</th>
                                    <th>OPS(against)</th>
                                    <th>whip</th>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>WPCT</th>
                                    <th>SVO</th>
                                    <th>SV</th>
                                    <th>CG</th>
                                    <th>IP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{projectedTableInfo.season}</td>
                                    <td>{projectedTableInfo.era}</td>
                                    <td>{projectedTableInfo.er}</td>
                                    <td>{projectedTableInfo.so}</td>
                                    <td>{projectedTableInfo.bb}</td>
                                    <td>{projectedTableInfo.bb9}</td>
                                    <td>{projectedTableInfo.kbb}</td>
                                    <td>{projectedTableInfo.k9}</td>
                                    <td>{projectedTableInfo.bk}</td>
                                    <td>{projectedTableInfo.h}</td>
                                    <td>{projectedTableInfo.h9}</td>
                                    <td>{projectedTableInfo.hr9}</td>
                                    <td>{projectedTableInfo.obp}</td>
                                    <td>{projectedTableInfo.slg}</td>
                                    <td>{projectedTableInfo.ops}</td>
                                    <td>{projectedTableInfo.whip}</td>
                                    <td>{projectedTableInfo.w}</td>
                                    <td>{projectedTableInfo.l}</td>
                                    <td>{projectedTableInfo.wpct}</td>
                                    <td>{projectedTableInfo.svo}</td>
                                    <td>{projectedTableInfo.sv}</td>
                                    <td>{projectedTableInfo.cg}</td>
                                    <td>{projectedTableInfo.ip}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>

                    <Container className="my-auto">
                        <Table striped bordered hover responsive="lg"variant="dark" >
                            <thead>
                                <tr>
                                    <th>Season</th>
                                    <th>ERA</th>
                                    <th>ER</th>
                                    <th>SO</th>
                                    <th>BB</th>
                                    <th>BB9</th>
                                    <th>KBB</th>
                                    <th>K/9</th>
                                    <th>BK</th>
                                    <th>H</th>
                                    <th>H/9</th>
                                    <th>HR/9</th>
                                    <th>OBP(against)</th>
                                    <th>SLG(against)</th>
                                    <th>OPS(against)</th>
                                    <th>whip</th>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>WPCT</th>
                                    <th>SVO</th>
                                    <th>SV</th>
                                    <th>CG</th>
                                    <th>IP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{pitchingTableInfo.season}</td>
                                    <td>{pitchingTableInfo.era}</td>
                                    <td>{pitchingTableInfo.er}</td>
                                    <td>{pitchingTableInfo.so}</td>
                                    <td>{pitchingTableInfo.bb}</td>
                                    <td>{pitchingTableInfo.bb9}</td>
                                    <td>{pitchingTableInfo.kbb}</td>
                                    <td>{pitchingTableInfo.k9}</td>
                                    <td>{pitchingTableInfo.bk}</td>
                                    <td>{pitchingTableInfo.h}</td>
                                    <td>{pitchingTableInfo.h9}</td>
                                    <td>{pitchingTableInfo.hr9}</td>
                                    <td>{pitchingTableInfo.obp}</td>
                                    <td>{pitchingTableInfo.slg}</td>
                                    <td>{pitchingTableInfo.ops}</td>
                                    <td>{pitchingTableInfo.whip}</td>
                                    <td>{pitchingTableInfo.w}</td>
                                    <td>{pitchingTableInfo.l}</td>
                                    <td>{pitchingTableInfo.wpct}</td>
                                    <td>{pitchingTableInfo.svo}</td>
                                    <td>{pitchingTableInfo.sv}</td>
                                    <td>{pitchingTableInfo.cg}</td>
                                    <td>{pitchingTableInfo.ip}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
            </main>
        </div>
    )
}

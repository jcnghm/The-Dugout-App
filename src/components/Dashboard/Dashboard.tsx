import React, { useState,  Suspense } from "react";
import { makeStyles, Button} from '@material-ui/core';
import background_image from '../../assets/images/dashboard_background.jpg'
import {NavBar} from '../NavBar'
import './searchstyles.css'
import {getPlayerInfo, getPlayerHitting, getPlayerPitching} from '../PlayerInfo'
import { Table, Col, Row, Container, Form } from 'react-bootstrap'


// makeStyles for the Player Stats Dashboard Page

const useStyles = makeStyles({
    button: {
        backgroundColor: '#00176b', 
        fontFamily:'roboto',
        color: 'white',
        marginLeft: '50px',
        marginTop: '50px'
    },
    title: {
        fontSize: '40px',
        fontFamily: 'Playball',
        fontWeight: 'normal'
    },
    table_title: {
        color: "white",
        fontFamily: "Playball",
        fontWeight: "normal",
        marginLeft: "20px",
    },
    bootstrap_table: {
        width: "60%",
        alignItems: "centered"
    },
    table: {
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        marginTop: '10%',
        transform: 'translate(50%, -40%)',
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: '25px',
        width: "50%",
        borderRadius: "12px",


    },
    table_output: {
        marginBottom: "3%",
        width: "60%",
        marginLeft: "18%",
        transform: 'translate(0%, -120%)',
    },
    output: {
        width: "100%",

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
        main_text: {
        textAlign: 'center',
        position: 'relative',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontFamily: 'Playball',
        fontSize: '30px',
    },
    searchbar: {
        fontSize: "20px"
    }
})

// Props to pass data to table (Info, Hitting, and Pitching)

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
    pro_debut_date: string
    height_feet: string
    height_inches: string
    weight: string
    high_school: string
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
    gidp: string
    go: string
    go_ao: string
    hbp: string
    hfly: string
    hgnd: string
    ppa: string
    tpa: string
    r: string
    roe: string
    sb: string
    xbh: string
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

export const Dashboard = () => {

    const classes = useStyles();

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(playerFullName)
        setplayerTableInfo(await getPlayerInfo(playerFullName))
        sethittingTableInfo(await getPlayerHitting(playerFullName))
        setpitchingTableInfo(await getPlayerPitching(playerFullName))
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
                bats: "",
                pro_debut_date: "",
                height_feet: "",
                height_inches: "",
                weight: "",
                high_school:"",
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
                gidp: '',
                go: '',
                go_ao:'',
                hbp:'',
                hfly:'',
                hgnd:'',
                ppa:'',
                tpa:'',
                r:'',
                roe:'',
                sb:'',
                xbh:'',
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
                bb9:'',
                bk:'',
                er:'',
                h:'',
                h9:'',
                hr9:'',
                obp:'',
                ops:'',
                slg:'',
                wpct:'',
                svo:'',
                cg:'',
            }
        )
        
        // Date formatting for Debut Date
        let debut_date = playerTableInfo.pro_debut_date;
        let debut = debut_date.slice(0,4)
        let height = `${playerTableInfo.height_feet}'${playerTableInfo.height_inches}"`

    return (

        <div className={classes.root}>

            {/* Nav Bar */}
            
            <NavBar/>

            {/* Main Player Stats Table Search Section */}

             <main className={classes.main}>
                <div className={classes.table}>
                    <div >
                        <h1 className = {classes.title}>Player Career Statistics</h1>
                        <form name="player-info" id="player-info" onSubmit={submitForm} >
                            <div className="container">
                                <input  value = {playerFullName} name = "fullname" id="fullname" className="searchbar" type="text" onChange={(e) => setPlayerName(e.target.value)}placeholder="Enter Player Name..."/>
                                <Button className = {classes.button} variant="contained" color = "primary" type="submit" >Get Player Info</Button>
                            </div>
                        </form>   
                    </div>
                </div>
               
                <Container className="my-auto">
                    <Table striped bordered hover responsive="lg"variant="dark">
                        <thead>
                            <tr>
                                <th >Name</th>
                                <th >Birthplace</th>
                                <th >Age</th>
                                <th>Height</th>
                                <th>Weight</th>
                                <th >Nickname</th>
                                <th>High School</th>
                                <th >College</th>
                                <th >MLB Debut</th>
                                <th >Team Name</th>
                                <th >Throws</th>
                                <th >Bats</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >{playerTableInfo.name_display_first_last}</td>
                                <td >{playerTableInfo.birth_city} {playerTableInfo.birth_state} {playerTableInfo.birth_country}</td>
                                <td >{playerTableInfo.age}</td>
                                <td>{height}</td>
                                <td>{playerTableInfo.weight}</td>
                                <td >{playerTableInfo.name_nick}</td>
                                <td>{playerTableInfo.high_school}</td>
                                <td >{playerTableInfo.college}</td>
                                <td >{debut}</td>
                                <td >{playerTableInfo.team_name}</td>
                                <td >{playerTableInfo.throws}</td>
                                <td >{playerTableInfo.bats}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
                <Container className="my-auto">
                    <Table striped bordered hover responsive="lg"variant="dark" className= {classes.output}>
                        <thead>
                            <tr>
                                <th>AVG</th>
                                <th>H</th>
                                <th>OBP</th>
                                <th>SLG</th>
                                <th>OPS</th>
                                <th>RBI</th>
                                <th>HR</th>
                                <th>SO</th>
                                <th>BB</th>
                                <th>GIDP</th>
                                <th>GO</th>
                                <th>GO/AO</th>
                                <th>HBP</th>
                                <th>HFLY</th>
                                <th>HGND</th>
                                <th>PPA</th>
                                <th>TPA</th>
                                <th>R</th>
                                <th>ROE</th>
                                <th>SB</th>
                                <th>XBH</th>
                                <th>AB</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{hittingTableInfo.avg}</td>
                                <td>{hittingTableInfo.h}</td>
                                <td>{hittingTableInfo.obp}</td>
                                <td>{hittingTableInfo.slg}</td>
                                <td>{hittingTableInfo.ops}</td>
                                <td>{hittingTableInfo.rbi}</td>
                                <td>{hittingTableInfo.hr}</td>
                                <td>{hittingTableInfo.so}</td>
                                <td>{hittingTableInfo.bb}</td>
                                <td>{hittingTableInfo.gidp}</td>
                                <td>{hittingTableInfo.go}</td>
                                <td>{hittingTableInfo.go_ao}</td>
                                <td>{hittingTableInfo.hbp}</td>
                                <td>{hittingTableInfo.hfly}</td>
                                <td>{hittingTableInfo.hgnd}</td>
                                <td>{hittingTableInfo.ppa}</td>
                                <td>{hittingTableInfo.tpa}</td>
                                <td>{hittingTableInfo.r}</td>
                                <td>{hittingTableInfo.roe}</td>
                                <td>{hittingTableInfo.sb}</td>
                                <td>{hittingTableInfo.xbh}</td>
                                <td>{hittingTableInfo.ab}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>

                <Container className="my-auto">
                    <Table striped bordered hover responsive="lg"variant="dark">
                        <thead>
                            <tr>
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
    
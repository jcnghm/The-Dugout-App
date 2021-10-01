import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import background_image from '../../assets/images/sandlot2.jpg';
import {NavBar} from '../NavBar'
import { AuthCheck } from 'reactfire'; 
import { Suspense } from 'react';

interface Props{
    title: string;
}

// New Make Styles Code
const useStyles = makeStyles({
    
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
        margin: '0, 0, 0, 0.45rem'
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
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontFamily: 'Playball',
        fontSize: '30px',
    },
    hrLine: {
        width: '60%',
        alignItems: 'center',
        marginLeft: '20%',
        marginTop: '25px'
    },
    homeText: {
        color: 'white',
    }
})

export const Home = ( props:Props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* Nav Bar */}

            {/* <NavBar/> */}
            <NavBar/>

            {/* Main Home Section */}
            <main className={classes.main}>
                <div className={classes.main_text}>
                    <h1>{ props.title }</h1>
                    <p>The Dugout is an interactive application for baseball reference and statistics</p>
                    <Suspense fallback={'loading...'}> 
                    <AuthCheck fallback={
                    <Button style={{backgroundColor: '#00176b', fontFamily:'roboto'}} color='primary' variant="contained" onClick={event =>  window.location.href='/signin'}>Sign In to View Stats</Button>
                    }>
                    <Button style={{backgroundColor: '#00176b', fontFamily:'roboto'}} color='primary' variant="contained" onClick={event =>  window.location.href='/dashboard'}>Search Players</Button>
                    </AuthCheck>
                    </Suspense>
                    <hr className={classes.hrLine} />
                </div>
                <div className={classes.main_text}>
                    <h1>Join The Community</h1>
                    <p>Use the Fantasy Manager Tool to manage your Fantasy Team  </p>
                    <Suspense fallback={'loading...'}>
                        <AuthCheck fallback={
                    <Button style={{backgroundColor: '#00176b', fontFamily:'roboto'}}color='primary' variant="contained" onClick={event =>  window.location.href='/signin'}>Sign In Here</Button>
                    }>
                    <Button style={{backgroundColor: '#00176b', fontFamily:'roboto'}} color='primary' variant="contained" onClick={event =>  window.location.href='/profile'}>Fantasy Manager</Button>
                    </AuthCheck>
                    </Suspense>
                </div>
            </main>
        </div>
    )
}
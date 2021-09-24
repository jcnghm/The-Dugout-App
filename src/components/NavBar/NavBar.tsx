import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import logo_image from '../../assets/images/logo3.jpg'
import { Link } from 'react-router-dom';
import { AuthCheck, useAuth } from 'reactfire'; 
import { Suspense } from 'react';


interface Props{
    title: string;
}

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
        paddingLeft: '15px',
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

export const NavBar = () => {

    const classes = useStyles();

    return (
        <nav>
                <div className={classes.navbar_container}>
                    <h1 className={ `${classes.logo} `}>
                        <img className={`${classes.logoImage}`}src= {logo_image}  alt="logo"/>
                        {/* <a href="/" className={ `${classes.logo_a} ${classes.logo_navigation}` }>The Dugout</a> */}
                        
                    </h1>
                    <ul className={ `${classes.navigation} ${classes.logo_navigation}` }>
                        <li>
                            <Link to="/" className={classes.nav_a}>Home</Link>
                        </li>
                         <Suspense fallback={'loading...'}> 
                             <AuthCheck fallback={ 
                                <li>
                                    <Link to="/signin" className={classes.nav_a}>Sign In</Link>
                                </li>
                                }> 
                                <li>
                                    <Link to="/profile" className={classes.nav_a}>Profile</Link>
                                </li>

                                <li>
                                    <Link to="/dashboard" className={classes.nav_a}>Player Stats</Link>
                                </li>
                                <li>
                                    <Link to="/signin" className={classes.nav_a}>Sign Out</Link>
                                </li>
                            </AuthCheck>
						</Suspense>
                    </ul>
                </div>
            </nav>
    )
}
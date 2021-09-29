import React from 'react';
import { makeStyles } from '@material-ui/core';
import logo_image from '../../assets/images/logo3.jpg'
import { Link } from 'react-router-dom';
import { AuthCheck, useAuth } from 'reactfire'; 
import { Suspense } from 'react';
import 'firebase/auth';
import './styles.css'
import { Container, Navbar, NavDropdown, Nav} from 'react-bootstrap'


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

// NavBar for all Pages
export const NavBar = () => {

    // SignOut for SignOut button
    const auth = useAuth();
    const sign_out = async () => {
        await auth.signOut();
    }

    const classes = useStyles();

    return (
        // <nav>
        //         <div className={classes.navbar_container}>
        //             <h1 className={ `${classes.logo} `}>
        //                 <Link to="/"><img className={`${classes.logoImage}`}src= {logo_image}  alt="logo"/></Link>
        //                 {/* <a href="/" className={ `${classes.logo_a} ${classes.logo_navigation}` }>The Dugout</a> */}
                        
        //             </h1>
        //             <ul className={ `${classes.navigation} ${classes.logo_navigation}` }>
        //                 <li>
        //                     <Link to="/" className={classes.nav_a}>Home</Link>
        //                 </li>
        //                  <Suspense fallback={'loading...'}> 
        //                      <AuthCheck fallback={ 
        //                         <li>
        //                             <Link to="/signin" className={classes.nav_a}>Sign In</Link>
        //                         </li>
        //                         }> 
        //                         <li>
        //                             <Link to="/profile" className={classes.nav_a}>Profile</Link>
        //                         </li>

        //                         <li>
        //                             <Link to="/dashboard" className={classes.nav_a}>Career Stats</Link>
        //                         </li>
        //                         <li>
        //                             <Link to="/season" className={classes.nav_a}>Season Stats</Link>
        //                         </li>
        //                         <li>
        //                             <Link to="/playerteam" className={classes.nav_a}>Player Teams</Link>
        //                         </li>
        //                         <li>
        //                             <Link to="/" className={classes.nav_a} onClick={sign_out}>Sign Out</Link>
        //                         </li>
        //                     </AuthCheck>
		// 				</Suspense>
        //             </ul>
        //         </div>
        //     </nav>
        <Navbar bg="black" expand="md" variant="dark" >
            <Container>
                <Navbar.Brand href="/">
                <img
                    src={logo_image}
                    className="d-inline-block align-top"
                    width="150px"
                    height="49px"
                    alt="logo"
                />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="container-fluid" id="navbar">
                        <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                            <Suspense fallback={'loading...'}>
                                <AuthCheck fallback={
                                    <Nav.Item>
                                        <Nav.Link href="/signin">SignIn</Nav.Link>
                                    </Nav.Item>
                                }>  
                                    <Nav.Item>
                                    <   Nav.Link href="/dashboard">Career Stats</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/season">Season Stats</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/playerteam">Player Teams</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/profile">Fantasy Manager</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="ml-auto">
                                        <Nav.Link href="/" onClick = {sign_out}>Logout</Nav.Link>
                                    </Nav.Item>
                                </AuthCheck>
                            </Suspense>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}
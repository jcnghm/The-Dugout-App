import React, {useState} from 'react';
import firebase from 'firebase/app';
import { useAuth, AuthCheck } from 'reactfire';
import 'firebase/auth';
import { Input } from '../sharedComponents/Input';
import { Container, Button, makeStyles, Typography, Snackbar,  } from '@material-ui/core';
import { RouteComponentProps, withRouter } from "react-router-dom";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import background_image from '../../assets/images/fantasy.jpg'
import {NavBar} from '../NavBar'



const Alert = (props:AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles({
    root: {
        padding: '0',
        margin: '0',
        backgroundColor: 'black',
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '25px',
        maxWidth:'380px', 
        padding: '20px',
        marginLeft: "15%"
    },
    main:{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url(${background_image});`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute',
        color: 'white',
        fontFamily:'Playball',

    },
    googleButton:{
        backgroundColor: '#00176B',
        marginTop: '2em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer',
        marginLeft: "25%"
    },
    googleLogo:{
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        textAlign: 'center',
        fontSize: '3em',
        fontFamily:'Playball'
    },
    containerStyle: {
        marginTop: '2em'
    },
    snackBar: {
        color: 'white',
        backgroundColor: '#4caf50'
    }

})

interface SignInProps{
    history: RouteComponentProps["history"];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
  }

export const SignIn = withRouter( (props:SignInProps) => {

    const auth = useAuth();
    const classes = useStyles();
    const { history } = props
    const [open, setOpen] = useState(false);

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClose = (event?: React.SyntheticEvent, reason?:string) => {
        if(reason === 'clickaway'){
            return;
        }

        setOpen(false)
        history.push('/')
    }

    const sign_in = async () => {
       const response = await auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
       if(response.user){
           handleSnackOpen()
       }
    };

    const sign_out = async () => {
        await auth.signOut();
    }

    return (

        <div className={classes.root}>
            <NavBar/>
        <div className={classes.main}>

            <Container maxWidth = 'sm' className={classes.containerStyle}>
                <Typography className={classes.typographyStyle}>Sign In</Typography>
                <form className={classes.input}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input  name="email" placeholder='Email' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input name="password" placeholder='Password' />
                </div>
                <Button type='submit' variant='contained' color='primary' onClick={sign_in}>Submit</Button>
                </form>
                
                <AuthCheck fallback={
                    <Button className={classes.googleButton} onClick={sign_in}>Sign In With Google</Button>
                }>
                    <Button variant='contained' color='secondary' onClick={sign_out}>Sign Out</Button>
                </AuthCheck>
                <Snackbar message={'Success'} open={open} autoHideDuration={2000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success">
                    Successful Sign In - Redirect in 2 secs
                </Alert>
                </Snackbar>

            </Container>
        </div>
        </div>
    )
})
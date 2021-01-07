import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState, loginAction } from '../../store/auth.slice';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.winvest-global.com/">
                Winvest Global
        </Link>{' '}
        All Rights Reserved
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginPage = () => {
    const classes = useStyles();

    const authState = useSelector(getAuthState);
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Enter valid email')
                .min(2, 'Must be 2 characters or more')
                .max(300, 'Must be 300 characters or less')
                .required('Email is required'),
            password: Yup.string()
                .min(2, 'Must be 2 characters or more')
                .max(50, 'Must be 50 characters or less')
                .required('Password is required'),
            rememberMe: Yup.boolean().oneOf([true, false]).notRequired()
        }),
        onSubmit: (data) => {
            setLoading(true);
            console.log('data ', data);
            dispatch(loginAction({ email: data.email, password: data.password }));
        }
    })

    useEffect(() => {
        if (authState.isAuthenticated) {
            setLoading(false);
            console.log('authState ', authState);
            history.push('/dashboard');
        }
        if (authState.loginError && loading) {
            setLoading(false);
        }
    }, [authState, loading]);

    const getAlert = () => {
        if (authState.loginError) {
            return (
                <Alert severity="error" color="error" >
                    {authState.loginError}
                </Alert>
            )
        }
        return null;
    }

    return (
        <>
            {getAlert()}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <span className="material-icons">
                            lock
</span>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
        </Typography>
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={formik?.errors?.email && formik?.errors?.email?.length ? true : false}
                            className={classnames({})}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            error={formik?.errors?.password && formik?.errors?.password.length ? true : false}
                            id="password"
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            id="rememberMe"
                            onChange={(e) => formik.setFieldValue('rememberMe', e.checked)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            className={classes.submit}
                        >
                            Sign In
          </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
              </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );
}

export default LoginPage;
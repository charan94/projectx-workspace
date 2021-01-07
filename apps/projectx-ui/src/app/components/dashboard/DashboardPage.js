import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../store/auth.slice';

const DashboardPage = () => {
    const authState = useSelector(getAuthState);
    const history = useHistory();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            history.push('/login');
        }
    }, [authState]);

    return (
        <Container maxWidth="xl">
            <p>Dashboard</p>
        </Container>
    );
}

export default DashboardPage;
import React from 'react';
import { Container } from '@mui/material';
import ContactsPage from './components/ContactsPage';
import LoginPage from './components/SigninPage';
import { useAppSelector } from './app/hooks';
import { selectLogin } from './features/user/userSlice';
import AppBar from './components/AppBar';

function App() {
  const login = useAppSelector(selectLogin);
  return (
    <Container component="main">
      {!login && <LoginPage />}
      {login && <>
        <AppBar login={login} />
        <ContactsPage login={login} />
      </>} 
    </Container>
  );
}

export default App;

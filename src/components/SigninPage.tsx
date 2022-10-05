import { Box, Button, Container, FormHelperText, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { getUser } from "../lib/api";
import { signIn } from "../features/user/userSlice";
import { User } from "../features/user/types";

//const theme = createTheme();

export default function SigninPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        getUser(login)
            .then((user: User | null) => {
                if (user) {
                    if (user.password === password) {
                        setError('');
                        dispatch(signIn(login));
                    } else {
                        setError('Invalid login or password');
                    }
                } else {
                    setError('Invalid login or password');
                }
            })
            .catch(error => {setError(error.toString());})
    }

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">Sign in</Typography>   
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoFocus
                        value={login}
                        onChange={e => {setLogin(e.target.value)}}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                    {/*<FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!(login && password)}
                    >
                        Sign In
                    </Button>
                    {error && <FormHelperText error>{error}</FormHelperText>}
                </Box>
            </Box>
        </Container>
    );
}

import { AppBar as MiuAppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { signOut } from "../features/user/userSlice";

interface Props {
    login: string;
}

export default function AppBar({login}: Props) {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOut());
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MiuAppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: "start" }}>
                        {login}
                    </Typography>
                    <Button color="inherit" onClick={handleSignOut}>SignOut</Button>
                </Toolbar>
            </MiuAppBar>
        </Box>
    );

}
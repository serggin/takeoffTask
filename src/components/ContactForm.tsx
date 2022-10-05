import { useState } from "react";
import { Box, Button, Container, FormHelperText, Paper, TextField } from "@mui/material";
import { Contact } from "../features/contact/types";


interface Props {
    //mode: "add" | "edit";
    contact: Contact;
    onSave: (c: Contact | null) => Promise<string>;
}

export default function ContactForm({contact, onSave}: Props) {
    const [name, setName] = useState(contact.name);
    const [phone, setPhone] = useState(contact.phone);
    const [email, setEmail] = useState(contact.email);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const error = await onSave({
            id: contact.id,
            login: contact.login,
            name,
            phone,
            email,
        });
        if(error) {
            console.error('onSave()', error);
            setError(error);
        }
    }
    const handleCancel = async () => {
        await onSave(null);
    }

    return(
        <Container maxWidth="sm">
            <Paper sx={{padding: 4}}>
            <Box
                sx={{
                    marginTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        value={name}
                        onChange={e => {setName(e.target.value)}}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        value={phone}
                        onChange={e => {setPhone(e.target.value)}}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={e => {setEmail(e.target.value)}}
                    />
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!(name.trim() && phone.trim() && email.trim())}
                        >
                            Save
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            color="secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Box>
                    {error && <FormHelperText error>{error}</FormHelperText>}
                </Box>
            </Box>
            </Paper>
        </Container>

    );
}
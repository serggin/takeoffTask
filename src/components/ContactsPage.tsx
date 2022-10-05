import { useCallback, useEffect, useState } from "react";
import { addContact, deleteContact, editContact, getContact, getContacts } from "../lib/api";
import { Contact } from '../features/contact/types';
import { Box, Button, Container, Typography } from "@mui/material";
import ContactsTable from "./ContactsTable";
import ContactForm from "./ContactForm";

interface Props {
    login: string;
}

export default function ContactsPage({login}: Props) {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [formContact, setFormContact] = useState<Contact | null>(null);
    const [formMode, setFormMode] = useState<"" | "add" | "edit">("");
    
    const defaultContact: Contact = {
        id: undefined,
        login,
        name: '',
        phone: '',
        email: ''
    }

    const refreshContacts = useCallback(() => {
        getContacts(login)
            .then((contacts: Contact[]) => {
                setContacts(contacts);
            })
        }, [login]);

    useEffect(() => {
        refreshContacts();
    }, [login, refreshContacts]);

    const onSave = async (contact: Contact | null): Promise<string> => {
        if (contact) {
            let error = "";
            const c = await getContact(login, contact.name);
            if (c && (formMode === "add" || (formMode === "edit" && c.id !== contact.id))) {
                error = `Can't ${formMode} Contact: the Name is in use`;
            } else {
                if (formMode === "add") {
                    await addContact(contact);
                } else {
                    await editContact(contact);
                }
                setFormMode("");
                refreshContacts();
            }
            return error;
        } else {
            setFormMode("");
            return "";
        }
    }

    const onEdit = async (contact: Contact): Promise<void> => {
        setFormContact(contact);
        setFormMode("edit");
    }

    const onDelete = async (id: number): Promise<void> => {
        await deleteContact(id);
        refreshContacts();
    }

    const onAddClick = () => {
        setFormContact(defaultContact);
        setFormMode("add");
    }

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">Contacts</Typography>
                <Box>
                    {!formMode && 
                        <Button 
                            type="button"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onAddClick}
                        >
                            Add Contact
                        </Button>}
                    {formMode && formContact &&
                        <ContactForm contact={formContact} onSave={onSave}/>
                    }
                </Box>
                <ContactsTable contacts={contacts} onEdit={onEdit} onDelete={onDelete} disabled={formMode !== ""}/>   
            </Box>
        </Container>
    );
}

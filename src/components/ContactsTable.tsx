import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Contact } from "../features/contact/types";
import { useState } from "react";
import { makeStyles } from 'tss-react/mui';

import SearchField from "./SearchField";
interface Props {
    contacts: Contact[];
    onEdit: (c: Contact) => void;
    onDelete: (id: number) => void;
    disabled: boolean;
}

export default function ContactsTable({contacts, onEdit, onDelete, disabled}: Props) {
    const opacity = disabled ? .5 : 1;
    const [searchValue, setSearchValue] = useState("");
    const { classes } = useStyles();

    const onSearchChange = (newValue: string) => {
        setSearchValue(newValue.trim());
    }
    const cellSearchedClass = (cellText: string): string => {
        return searchValue && caseInsensitiveSearch(cellText.trim(), searchValue) ? classes.selected : "";
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden'}}>
            <Box sx={{ width: '40%'}}>
                <SearchField onChange={onSearchChange}/>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: '100%'}}>
                <Table 
                    stickyHeader
                    sx={{minWidth: 500, opacity}} 
                    aria-label="Contacts table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell className="Mui-selected">Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map(contact => (
                            <TableRow key={contact.name}>
                                <TableCell component="th" scope="row"
                                    className={cellSearchedClass(contact.name)}
                                >
                                    {contact.name}
                                </TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>
                                    <IconButton 
                                        aria-label="edit" 
                                        onClick={() => {onEdit(contact)}}
                                        disabled={disabled}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton 
                                        aria-label="delete" 
                                        onClick={() => {onDelete(contact.id!)}}
                                        disabled={disabled}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

const useStyles = makeStyles() (
    (theme) => ({
    "selected": {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
    } 
}));

function caseInsensitiveSearch(str: string, search: string): boolean {
    return str.search(new RegExp(search, "i")) !== -1;
}

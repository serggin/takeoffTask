import { styled, alpha } from '@mui/material/styles';
import { IconButton, InputBase } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { useState } from 'react';

const Search = styled('div')(({theme}) => ({
    borderWidth: 3,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    display: "flex",
    justifyContent: "stretch",
    width: "100%",
    height: "3em",
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
}));    

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    flex: 1,
})); 

interface Props {
    onChange: (value: string) => void;
}

export default function SearchField({onChange}: Props) {
    const [search, setSearch] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
        onChange(value);
    };
    const cancelSearch = () => {
        setSearch('');
        onChange('');
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase 
                placeholder='Search in Name'
                value={search}
                onChange={handleChange}/>
            {search && 
                <IconButton 
                    aria-label="cancel search" 
                    onClick={cancelSearch}
                >
                    <ClearIcon />
                </IconButton>
            }
        </Search>
    );
}

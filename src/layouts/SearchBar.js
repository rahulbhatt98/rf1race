import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchUserAsync, searchTrackAsync, searchEventAsync, searchDatabaseAsync, searchUserCreatedAsync } from "../features/search/searchSlice"
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('')
    const [showSearch, setSearchShow] = useState(false)

    const dispatch = useDispatch();

    const handleSearchValue = (e) => {
        setKeyword(e.target.value)
    }

    const handleShowSearch = () => {
        setSearchShow(true)
    }

    const handleHideSearch = () => {
        setSearchShow(false)
    }

    useEffect(() => {
        if(keyword.length === 0){
            dispatch(searchUserAsync(keyword))
            dispatch(searchDatabaseAsync(keyword))
        }
        if (keyword.length > 2) {
            dispatch(searchUserAsync(keyword))
            dispatch(searchDatabaseAsync(keyword))
            dispatch(searchEventAsync(keyword))
            dispatch(searchUserCreatedAsync(keyword))
        }
    }, [dispatch, keyword])
    return (
        <div className="search-guest">
            {
                (showSearch) ?
                    <>
                        <input type="text" placeholder="search terms here" onChange={handleSearchValue} />
                        <ClearIcon className="guestserch-close" onClick={handleHideSearch}/>
                    </>
                    :
                    <SearchIcon onClick={handleShowSearch} />
            }
        </div>
    )
}

export default SearchBar

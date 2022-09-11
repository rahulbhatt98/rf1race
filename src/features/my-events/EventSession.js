import React from 'react'
import { useEffect } from 'react';
import ProfileHeader from '../account/ProfileHeader'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchEventList, fetchEventSessionList, eventSessionAsync, eventSessionLapAsync } from "../my-events/myEventsSlice"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Link } from "react-router-dom";
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { BsCameraVideoFill } from 'react-icons/bs';
import { RiSave3Line } from 'react-icons/ri';
import { selectAuth } from "../auth/authSlice";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon style={{ color: 'white' }} /> : <FirstPageIcon style={{ color: 'white' }} />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight style={{ color: 'white' }} /> : <KeyboardArrowLeft style={{ color: 'white' }} />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft style={{ color: 'white' }} /> : <KeyboardArrowRight style={{ color: 'white' }} />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon style={{ color: 'white' }} /> : <LastPageIcon style={{ color: 'white' }} />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const EventSession = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const eventDetail = useSelector(fetchEventList);
    const eventSessionDetail = useSelector(fetchEventSessionList)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const auth = useSelector(selectAuth);
    const authId = auth?.data?.user_id;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - eventSessionDetail?.data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    var toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    const filteredArray = eventDetail?.data.filter((val) => {
        return Number(val.id) === Number(id)
    })

    useEffect(() => {
        dispatch(eventSessionAsync(id))
        dispatch(eventSessionLapAsync(authId))
    }, [dispatch, id, authId])

    return (
        <>
            <ProfileHeader />

            <div className="previous-session">
                <ul className='previous-session-list'>
                    {
                        filteredArray.map((val, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <li>
                                        {new Intl.DateTimeFormat('en-GB', {
                                            month: 'long',
                                            day: '2-digit',
                                            year: 'numeric',
                                        }).format(new Date(val?.created_at))}
                                    </li>
                                    <li>
                                        {val?.event_name}
                                    </li>
                                    <li>
                                        {(val?.location) ? val?.location : 'location'}
                                    </li>
                                    <li>
                                        {(val?.lap_time) ? toHHMMSS(val?.lap_time) : '-'}
                                    </li>
                                </React.Fragment>
                            )
                        })
                    }
                </ul>
            </div>

            <TableContainer component={Paper}  className="event-track">
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" style={{ backgroundColor: "#14121c" }}>
                    <TableHead>
                        <TableRow style={{ color: "white" }}>
                            <TableCell style={{ color: 'white' }}>Date</TableCell>
                            <TableCell style={{ color: 'white' }}>Session</TableCell>
                            <TableCell style={{ color: 'white' }}>Track Layout</TableCell>
                            <TableCell style={{ color: 'white' }}>Best Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(eventSessionDetail?.data.length >= 0) ? (rowsPerPage > 0
                            ? eventSessionDetail?.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : eventSessionDetail?.data
                        ).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Link
                                        to={`/event-session-lap/${row.id}`}
                                        style={{ textDecoration: 'none', color: 'white' }}
                                    > {new Intl.DateTimeFormat('en-GB', {
                                        month: 'long',
                                        day: '2-digit',
                                        year: 'numeric',
                                    }).format(new Date(filteredArray[0]?.created_at))}
                                    </Link>
                                </TableCell>
                                <TableCell  >
                                    <Link
                                        to={`/event-session-lap/${row.id}`}
                                        style={{ textDecoration: 'none', color: 'white' }}
                                    >
                                        {row?.session_name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        to={`/event-session-lap/${row.id}`}
                                        style={{ textDecoration: 'none', color: 'white' }}
                                    >
                                        {(row?.track_layout) ? row?.track_layout : '-'}
                                    </Link>
                                </TableCell>
                                <TableCell style={{ color: 'white' }}>
                                    <div className='best-lap-session'>
                                        <div className="lap-session">
                                            <Link
                                                to={`/event-session-lap/${row.id}`}
                                                style={{ textDecoration: 'none', color: 'white' }}
                                            >{(row?.lap_time) ? toHHMMSS(row?.lap_time) : '-'}
                                            </Link>
                                        </div>
                                        <div className='lap-other-details'>
                                            {row?.track_time} | {row?.lap} LAPS | <TiWeatherPartlySunny /> | <BsCameraVideoFill /> | <RiSave3Line />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) : 'No data found'}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} style={{ color: 'white' }} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={eventSessionDetail?.data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                style={{ color: 'white' }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default EventSession
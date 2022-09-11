import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import { Grid } from "@mui/material";
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useHistory } from "react-router-dom";

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

const AccountCard = ({ data, indexValue }) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    let history = useHistory();

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.data.length) : 0;

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

    const handleAddVehicle = () => {
        history.push("/add-vehicle")
    }

    return (
        <>
            {
                (indexValue === 0) ?
                    <>
                        {data?.data?.map((value, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                                    <Card>
                                        <CardActionArea>
                                            <Link
                                                to={`/vehicle-selected/${value.vehicle_id}`}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={(value.photo) ? value.vehicle_photo : 'https://media.istockphoto.com/photos/red-generic-sedan-car-isolated-on-white-background-3d-illustration-picture-id1189903200?k=20&m=1189903200&s=612x612&w=0&h=L2bus_XVwK5_yXI08X6RaprdFKF1U9YjpN_pVYPgS0o='}
                                                    alt="green iguana"
                                                />
                                            </Link>
                                            <CardContent>
                                                <Link
                                                    to={`/vehicle-selected/${value.vehicle_id}`}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 800 }}>
                                                        {value.vehicle_make} {value.vehicle_model}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {value.vehicle_nickname}
                                                    </Typography>
                                                </Link>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })
                        }
                        <Button className='add-vehicles' onClick={handleAddVehicle}>
                            Add
                            <AddCircleOutlineIcon/>
                        </Button>
                    </>
                    :
                    (indexValue === 1) ?
                        <>
                            <TableContainer component={Paper} className="event-track">
                                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" style={{ backgroundColor: "#14121c" }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ color: 'white' }}>Date</TableCell>
                                            <TableCell style={{ color: 'white' }}>Event Name</TableCell>
                                            <TableCell style={{ color: 'white' }}>Location</TableCell>
                                            <TableCell style={{ color: 'white' }}>Best Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage
                                            ? data?.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : data?.data)
                                            .map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Link
                                                            to={`/event-session/${row.id}`}
                                                            style={{ textDecoration: 'none', color: 'white' }}
                                                        >
                                                            {new Intl.DateTimeFormat('en-GB', {
                                                                month: 'long',
                                                                day: '2-digit',
                                                                year: 'numeric',
                                                            }).format(new Date(row?.created_at))}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell  >
                                                        <Link
                                                            to={`/event-session/${row.id}`}
                                                            style={{ textDecoration: 'none', color: 'white' }}
                                                        >
                                                            {row?.event_name}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link
                                                            to={`/event-session/${row.id}`}
                                                            style={{ textDecoration: 'none', color: 'white' }}
                                                        >{(row?.location) ? row?.location : 'location'}
                                                        </Link></TableCell>
                                                    <TableCell>
                                                        <Link
                                                            to={`/event-session/${row.id}`}
                                                            style={{ textDecoration: 'none', color: 'white' }}
                                                        >{(row.lap_time) ? toHHMMSS(row.lap_time) : '-'}
                                                        </Link></TableCell>
                                                </TableRow>
                                            ))}

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
                                                count={data?.data.length}
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
                        :
                        (indexValue === 2) ?
                            ''
                            :
                            (indexValue === 3) ?
                                <>
                                    {data?.data.map((value, index) => {
                                        return (
                                            <>{
                                                value?.member_details.map((val, index) => {
                                                    return (
                                                        <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                                                            <Card>
                                                                <CardActionArea>
                                                                    <CardMedia
                                                                        component="img"
                                                                        height="140"
                                                                        image={(val.photo) ? val.photo : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
                                                                        alt="green iguana"
                                                                    />
                                                                    <CardContent>
                                                                        <Typography gutterBottom variant="h5" style={{ fontWeight: 800 }}>
                                                                            {val.name}
                                                                        </Typography>
                                                                        <Typography gutterBottom variant="h5">
                                                                            {val.nick_name}
                                                                        </Typography>
                                                                    </CardContent>
                                                                </CardActionArea>
                                                            </Card>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                            </>
                                        )
                                    })
                                    }
                                </>
                                : ''
            }
        </>
    )
}

export default AccountCard
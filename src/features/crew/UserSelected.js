import React, { useEffect } from 'react'
import ProfileHeader from '../account/ProfileHeader'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { crewByIdAsync, fetchCrewListById, fetchSearchUserList } from "./crewSlice"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from "react-router-dom";

const UserSelected = () => {
    const { id } = useParams()

    const dispatch = useDispatch();

    const userList = useSelector(fetchSearchUserList);

    const crewList = useSelector(fetchCrewListById)

    const filteredArray = userList?.data.filter((val) => {
        return Number(val.id) === Number(id)
    })

    console.log(crewList?.data)

    useEffect(() => {
        dispatch(crewByIdAsync(id))
    }, [dispatch, id])
    return (
        <>
            <ProfileHeader />

            <div className='crew-select-header'>
                <img src={(filteredArray[0]?.photo) ? filteredArray[0]?.photo:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" style={{ width: '80px', height: '80px', borderRadius: '50px' }} />
                <h2>{filteredArray[0]?.name}</h2>
                <h5>{filteredArray[0]?.nick_name}</h5>
            </div>
            <h3>
                CREWS
            </h3>
            {
                (crewList?.data.length !== 0)?
                <ul className='crew-list'>
                {
                    crewList?.data.map((val, index) => {
                        return (
                            <li key={index}>
                                <div className='crew-listing'>
                                    <img src={(val?.photo) ? val?.photo : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" style={{ width: '30px', height: '30px', borderRadius: '50px' }} />
                                    <div className='crew-information'>
                                        <h3>
                                            {val?.name}
                                        </h3>
                                        <h6>
                                            {val?.crew_member_count} MEMBERS, {val?.crew_location}
                                        </h6>
                                    </div>
                                    <Link
                                        to={`/crew-selected/${val.id}`}
                                        style={{ textDecoration: 'none', color: 'white' }}
                                    >
                                        <ChevronRightIcon />
                                    </Link>

                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            :
            <h1>No Record Found</h1>

            }

        </>
    )
}

export default UserSelected

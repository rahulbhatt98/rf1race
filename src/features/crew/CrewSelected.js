import React, { useEffect } from 'react'
import ProfileHeader from '../account/ProfileHeader'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectedCrewList, selectedCrewAsync } from "./crewSlice"

const CrewSelected = () => {
    const { id } = useParams()

    const dispatch = useDispatch();
    const selectUserList = useSelector(fetchSelectedCrewList);

    useEffect(() => {
        dispatch(selectedCrewAsync(id))
    }, [dispatch, id])
    return (
        <>
            <ProfileHeader />

            <div className='crew-select-header'>
                <img src={(selectUserList?.data[0]?.photo) ? selectUserList?.data[0]?.photo : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" style={{ width: '80px', height: '80px', borderRadius: '50px' }} />
                <h2>{selectUserList?.data[0]?.name}</h2>
                <h5>{selectUserList?.data[0]?.member_details.length} MEMBER, {selectUserList?.data[0]?.crew_location}</h5>
            </div>
            <h3>
                MEMBERS
            </h3>
            <ul className='crew-list'>
                {
                    selectUserList?.data[0]?.member_details.map((val, index) => {
                        return (
                            <li key={index}>
                                <div className='crew-listing'>
                                    <img src={(val?.photo) ? val?.photo : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" style={{ width: '30px', height: '30px', borderRadius: '50px' }} />
                                    <div className='crew-information'>
                                        <h3>
                                            {val?.name}
                                        </h3>
                                        <h6>
                                            {(val?.nick_name) ? val?.nick_name : "nickname"}
                                        </h6>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CrewSelected

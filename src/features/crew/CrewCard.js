import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from "react-router-dom";

const CrewCard = ({ indexValue, data }) => {
    return (
        <>
            {
                (indexValue === 0) ?
                    <>
                        <ul className='crew-list'>
                            {
                                data?.data.map((val, index) => {
                                    return (
                                        <li key={index}>
                                            <div className='crew-listing'>
                                                <img src={(val?.photo) ? val?.photo : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" style={{ width: '30px', height: '30px', borderRadius: '50px' }} />
                                                <div className='crew-information'>
                                                    <h3>
                                                        {val?.name}
                                                    </h3>
                                                    <h6>
                                                        {(val?.nick_name) ? val?.nick_name : "nickname"} , {val?.crew_member_count} CREW
                                                    </h6>
                                                </div>
                                                <Link
                                                    to={`/user-selected/${val.id}`}
                                                    style={{ textDecoration: 'none', color: 'white' }}
                                                >  <ChevronRightIcon />
                                                </Link>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </> :
                    <>
                        <ul className='crew-list'>
                            {
                                data?.data.map((val, index) => {
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
                    </>
            }
        </>
    )
}

export default CrewCard

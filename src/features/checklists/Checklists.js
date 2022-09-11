import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { checkAsync, fetchChecklist, addChecklistAsync } from "./checklistsSlice"
import Box from '@mui/material/Box';

export default function Checklists() {

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const checklist = useSelector(fetchChecklist);
  const [listname, setName] = useState("")
  const authId = auth?.data?.user_id

  const handleChange = (e) => {
    setName(e.target.value)
  }

  var min = 1;
  var max = 10000;
  var rand = Math.floor(min + (Math.random() * (max - min)));
  var checklistData = {
    "userid": authId,
    "checkName": listname,
    "checkUniqueId": rand
  }
  const addList = async () => {
    await dispatch(addChecklistAsync(checklistData))
    dispatch(checkAsync(authId))
    setName('')
  }


  useEffect(() => {
    dispatch(checkAsync(authId))
  }, [dispatch, authId])

  return (
    <>
      <div className='heading line-green'>
        <h1>CHECKLISTS</h1>
      </div>
      <ul className="checklist-list">
        {
          checklist?.data.map((val, index) => {
            return (
              <React.Fragment key={index}>
                <Link
                  to={`/checklist-selected/${val.id}`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <li>{val.name}</li>
                </Link>
              </React.Fragment>
            )
          })
        }
        <li className="add-checklist">
          <Box sx={{ display: 'flex' }}>
            <AddCircleOutlineIcon onClick={addList} />
            <input type="text" className="add-checklist-input" placeholder="New List" value={listname} onChange={handleChange} />
          </Box>
        </li>
      </ul>
    </>
  )
}
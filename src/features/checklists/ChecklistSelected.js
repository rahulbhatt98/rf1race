import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import { checkSelectedAsync, fetchChecklistSelected, addSelectChecklistAsync } from "./checklistsSlice"
import Button from '@mui/material/Button';
import { selectAuth } from "../auth/authSlice";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

const ChecklistSelected = () => {

    const dispatch = useDispatch();
    const { id } = useParams()

    var [allcheckbox, setCheckboxes] = useState([]);
    const checklistSelected = useSelector(fetchChecklistSelected);
    const auth = useSelector(selectAuth);
    const [listname, setName] = useState("")
    const authId = auth?.data?.user_id

    const handleChange = (e) => {
        setName(e.target.value)
    }
    var min = 1;
    var max = 10000;
    var rand = Math.floor(min + (Math.random() * (max - min)));

    let checkSingleItem = [
        {
            "checkListDetailName": listname,
            "checkListDetailSelected": 0,
            "checkListDetailUniqueId": rand,
            "checkListId": id
        }
    ]

    var checklistData = {
        "userid": authId,
        "checkItem": checkSingleItem,
    }
    const addList = async () => {
        await dispatch(addSelectChecklistAsync(checklistData))
        dispatch(checkSelectedAsync(id))
        setName('')
    }
    const handleCheckbox = async (e) => {
        console.log(e.target.name);
        let checkBoxObject = {
            "checkListDetailName": e.target.name,
            "checkListDetailSelected": e.target.checked ? 1 : 0,
            "checkListDetailUniqueId": e.target.value,
            "checkListId": id
        }

        setCheckboxes([
            ...allcheckbox, checkBoxObject]);

        let checklistModify = {
            "userid": authId,
            "checkItem": [
                ...allcheckbox, checkBoxObject],
        }

        await dispatch(addSelectChecklistAsync(checklistModify))
        await dispatch(checkSelectedAsync(id))
    }

    console.log(allcheckbox)

    useEffect(() => {
        dispatch(checkSelectedAsync(id))
    }, [dispatch, id])

    return (
        <>
            <div className="check-back-button">
                <Link to={`/checklists`}>Back</Link>
            </div>
            <div className="checklist-head">
                <div className='heading line-green'>
                    <h1> {checklistSelected?.data?.name}</h1>
                </div>
                <Button className="reset-button">
                    Reset
                </Button>
            </div>
            {
                checklistSelected?.data?.check_details.map((val, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="checklist-label">
                                <span>
                                    <input type="checkbox" className="checked-color" name={val?.name} value={val?.checklist_detail_unique_id} onChange={handleCheckbox} checked={val.is_selected === 1 ? true : false} />
                                    <span></span>
                                </span>
                                <label>{val?.name}</label>
                            </div>
                        </React.Fragment>
                    )
                })
            }
            <Box sx={{ display: 'flex' }} className="add-checklist" mt={2}>
                <AddCircleOutlineIcon onClick={addList} /> <input type="text" className="add-checklist-input" placeholder="New List" value={listname} onChange={handleChange} />
            </Box>

        </>
    )
}

export default ChecklistSelected
import { combineReducers } from "redux";
import searchReducer from "../features/search/searchSlice"
import authReducer from "../features/auth/authSlice";
import crewReducer from "../features/crew/crewSlice";
import eventReducer from "../features/my-events/myEventsSlice"
import vehicleReducer from "../features/my-vehicles/myVehiclesSlice"
import checklistReducer from "../features/checklists/checklistsSlice"

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  auth: authReducer,
  search:searchReducer,
  crew: crewReducer,
  event: eventReducer,
  vehicle: vehicleReducer,
  checklist: checklistReducer
});

export default rootReducer;
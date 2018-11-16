import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import EntitiesReducer from './entities_reducer';
import ErrorsReducer from './errors_reducer';
import UiReducer from './ui_reducer'

export default combineReducers({
  entities: EntitiesReducer,
  session: SessionReducer,
  errors: ErrorsReducer,
  ui: UiReducer
});

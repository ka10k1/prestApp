import { createStore } from "redux"
import rootReducer from "./rootReducer"
import { persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
//import { composeWithDevTools } from 'redux-devtools-extension'

const persistConfig = {
	key: 'TODO',
	storage,
	whitelist: ['todos', 'currentIndex']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)

export const persistor = persistStore(store)
//persistor.purge()
export default store

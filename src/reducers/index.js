import { combineReducers } from 'redux';
import Items from '../itemsData.json';

const packedItemsReducer = (items = Items.packed, action) => {
    if (action.type === 'ADD_PACK_ITEM') {
        return [...items, action.payload];
    } else if (action.type === 'REMOVE_PACK_ITEM') {
        return items.filter(item => {
            return item.id !== action.payload.id
        });
    }

    return items;
}

const unPackedItemsReducer = (items = Items.unPacked, action) => {
    if (action.type === 'ADD_UNPACK_ITEM') {
        return [...items, action.payload];
    } else if (action.type === 'REMOVE_UNPACK_ITEM') {
        return items.filter(item => {
            return item.id !== action.payload.id
        });
    }

    return items;
}

const searchTermPacked = (term = '', action) => {
    if (action.type === 'SEARCH_PACKED') {
        return action.payload;
    }

    return term;
}

const searchTermUnPacked = (term = '', action) => {
    if (action.type === 'SEARCH_UNPACKED') {
        return action.payload;
    }

    return term;
}

export default combineReducers({
    packed: packedItemsReducer,
    unPacked: unPackedItemsReducer,
    searchTermPacked: searchTermPacked,
    searchTermUnPacked: searchTermUnPacked
});
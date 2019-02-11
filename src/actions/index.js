export const addPackItem = (item) => {
    return {
        type: 'ADD_PACK_ITEM',
        payload: item
    };
}

export const removePackItem = (item) => {
    return {
        type: 'REMOVE_PACK_ITEM',
        payload: item
    };
}

export const addUnPackItem = (item) => {
    return {
        type: 'ADD_UNPACK_ITEM',
        payload: item
    };
}

export const removeUnPackItem = (item) => {
    return {
        type: 'REMOVE_UNPACK_ITEM',
        payload: item
    };
}

export const searchPacked = (term) => {
    return {
        type: 'SEARCH_PACKED',
        payload: term
    };
}

export const searchUnPacked = (term) => {
    return {
        type: 'SEARCH_UNPACKED',
        payload: term
    };
}
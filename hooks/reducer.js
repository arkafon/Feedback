import { combineReducers } from 'redux'; // опционально (см. ниже)


const ratingReducer = (state = {}, { type, payload }) => {
    if (type === 'CHANGE_RATING') {
        const { id, rate } = payload;

        return {
            ...state,
            [id]: rate,
        };
    }

    return state;
};

const isLoadedReducer = (state = false, { type }) => {
    if (
        type === 'FETCH' ||
        type === 'FETCH_FAIL'
    ) {
        return false;
    }

    if (type === 'FETCH_SUCCESS') {
        return true;
    }

    return state;
};

const isSendingReducer = (state = false, { type }) => {
    if (type === 'SENDING') {
        return true;
    }

    if (type === 'SENT') {
        return false;
    }

    return state;
};

const isVisibleReducer = (state = false, { type, payload }) => {
    if (type === 'RATE_LATER') {
        return false;
    }

    if (type === 'FETCH_SUCCESS') {
        const { data, isForced } = payload;
        const hasNotPassed = data.Status === '' || isForced;

        return hasNotPassed && !!data.headItems.results.length;
    }

    return state;
};

const isSurveyDoneReducer = (state = false, { type }) => {
    if (type === 'SET_SURVEY_DONE') {
        return true;
    }

    return state;
};

const messageReducer = (state = '', { type, payload }) => {
    if (type === 'SET_MESSAGE') {
        return payload;
    }

    return state;
};

const questionsReducer = (state = { headItems: [] }, { type, payload }) => {
    if (type === 'FETCH_SUCCESS') {
        const { data } = payload;

        return {
            ...data,
            headItems: data.headItems.results,
        };
    }

    if (type === 'SET_COMMENTS') {
        return {
            ...state,
            Comments: payload,
        };
    }

    if (type === 'CHANGE_RATING') {
        const { id, rate } = payload;
        const { headItems } = state;

        const newHeadItems = headItems.map((item) => {
            if (item.CritId === id) {
                return {
                    ...item,
                    Rate: rate,
                };
            }

            return item;
        });

        return {
            ...state,
            headItems: newHeadItems,
        };
    }

    return state;
};

// без redux:
//
// export default (state = initialState, action) => ({
//     rating: ratingReducer(state.rating, action),
//     isLoaded: isLoadedReducer(state.isLoaded, action),
//     isSending: isSendingReducer(state.isSending, action),
//     isVisible: isVisibleReducer(state.isVisible, action),
//     isSurveyDone: isSurveyDoneReducer(state.isSurveyDone, action),
//     message: messageReducer(state.message, action),
//     questions: questionsReducer(state.questions, action),
// });

export default combineReducers({
    rating: ratingReducer,
    isLoaded: isLoadedReducer,
    isSending: isSendingReducer,
    isVisible: isVisibleReducer,
    isSurveyDone: isSurveyDoneReducer,
    message: messageReducer,
    questions: questionsReducer,
});

import * as R from 'ramda';


const reducer = (state, { type, payload }) => {
    if (
        type === 'FETCH' ||
        type === 'FETCH_FAIL'
    ) {
        return {
            ...state,
            isLoaded: false,
        };
    }

    if (type === 'FETCH_SUCCESS') {
        const { data, isForced } = payload;
        const hasNotPassed = data.Status === '' || isForced;

        return {
            ...state,
            questions: {
                ...data,
                headItems: data.headItems.results,
            },
            isLoaded: true,
            isVisible: hasNotPassed && !!data.headItems.results.length,
        };
    }

    if (type === 'RATE_LATER') {
        return {
            ...state,
            isVisible: false,
        };
    }

    if (type === 'CHANGE_RATING') {
        const { id, rate } = payload;
        const { rating } = state;
        const { headItems } = state.questions;

        const newHeadItems = R.map((item) => {
            if (item.CritId === id) {
                return {
                    ...item,
                    Rate: rate,
                };
            }

            return item;
        }, headItems);

        rating[id] = rate;

        return {
            ...state,
            rating,
            questions: {
                ...state.questions,
                headItems: newHeadItems,
            },
        };
    }

    if (type === 'SET_SURVEY_DONE') {
        return {
            ...state,
            isSurveyDone: true,
        };
    }

    if (type === 'SENDING') {
        return {
            ...state,
            isSending: true,
        };
    }

    if (type === 'SENT') {
        return {
            ...state,
            isSending: false,
        };
    }

    if (type === 'SET_MESSAGE') {
        return {
            ...state,
            message: payload,
        };
    }

    if (type === 'SET_COMMENTS') {
        const { questions } = state;

        questions.Comments = payload;

        return {
            ...state,
            questions,
        };
    }

    return state;
};

export default reducer;

export const fetch = () => ({
    type: 'FETCH',
});

export const fetchSuccess = (data, isForced) => ({
    type: 'FETCH_SUCCESS',
    payload: { data, isForced },
});

export const fetchFail = () => ({
    type: 'FETCH_FAIL',
});

export const changeRating = (rate, id) => ({
    type: 'CHANGE_RATING',
    payload: { rate, id },
});

export const setComments = value => ({
    type: 'SET_COMMENTS',
    payload: value,
});

export const rateLater = () => ({
    type: 'RATE_LATER',
});

export const setSurveyDone = () => ({
    type: 'SET_SURVEY_DONE',
});

export const sending = () => ({
    type: 'SENDING',
});

export const sent = () => ({
    type: 'SENT',
});

export const setMessage = message => ({
    type: 'SET_MESSAGE',
    payload: message,
});

import { useEffect, useReducer } from 'react';
import * as Api from './api';
import * as Action from './actions';
import * as Dict from './dict';
import reducer from './reducer';


const init = () => ({
    rating: {},
    isLoaded: false,
    isSending: false,
    isVisible: false,
    isSurveyDone: false,
    message: '',
    questions: {
        headItems: [],
    },
});

export const useFeedback = (appId, isForced) => {
    const [state, dispatch] = useReducer(reducer, {}, init);

    useEffect(() => {
        dispatch(Action.fetch());

        Api.metadataRequest();
        Api.fetchFeedback(appId)
            .then((response) => {
                dispatch(Action.fetchSuccess(response.data.d, isForced));
            })
            .catch((error) => {
                dispatch(Action.fetchFail());
                dispatch(Action.setMessage(Dict.ERROR_UNKNOWNERROR));

                console.warn(error); // eslint-disable-line
            });
    }, [appId, isForced]);

    return {
        state,
        dispatch,
    };
};

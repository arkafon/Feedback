import { useContext } from 'react';
import * as Api from './api';
import * as Action from './actions';
import * as Dict from './dict';
import validate from './validate';
import { FeedbackState, FeedbackDispatch } from './context';


export const getClientInfo = () => ({
    ScrWidth: window.screen.width || 0,
    ScrHeight: window.screen.height || 0,
    InrWidth: window.innerWidth || 0,
    InrHeight: window.innerHeight || 0,
});

const useFooterHook = () => {
    const dispatch = useContext(FeedbackDispatch);
    const {
        isSurveyDone,
        isSending,
        questions,
    } = useContext(FeedbackState);

    const onSubmit = () => {
        if (isSurveyDone) return null;

        const validation = validate(questions);

        if (!validation.isValid) {
            dispatch(Action.setMessage(validation.message));

            return null;
        }

        const clientInfo = getClientInfo();
        const requestBody = {
            ...questions,
            ...clientInfo,
        };

        requestBody.Status = 'X';

        dispatch(Action.sending());

        return Api.sendFeedback(requestBody)
            .then(() => {
                dispatch(Action.setSurveyDone());
                dispatch(Action.sent());
                dispatch(Action.setMessage(Dict.MESSAGE_SENT));
            })
            .catch((error) => {
                dispatch(Action.setSurveyDone());
                dispatch(Action.sent());
                dispatch(Action.setMessage(Dict.ERROR_UNKNOWNERROR));

                console.warn(error); // eslint-disable-line
            });
    };

    const onRateLater = () => {
        dispatch(Action.rateLater());
    };

    const onDontAsk = () => {
        const clientInfo = getClientInfo();
        const requestBody = {
            ...questions,
            ...clientInfo,
        };

        requestBody.Status = 'D';

        return Api.sendFeedback(requestBody)
            .then(console.log)  // eslint-disable-line
            .catch(console.warn);  // eslint-disable-line
    };

    return {
        onSubmit,
        onRateLater,
        onDontAsk,
        isSurveyDone,
        isSending,
    };
};

export default useFooterHook;

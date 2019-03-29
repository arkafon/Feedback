import { useContext } from 'react';
import * as Api from './api';
import * as Action from './actions';
import * as Dict from './dict';
import validate from './validate';
import { getClientInfo } from './hooks';
import { FeedbackState, FeedbackDispatch } from './context';


const useRatingHook = () => {
    const dispatch = useContext(FeedbackDispatch);
    // const { rating } = useContext(FeedbackState);

    const onRatingChange = (rate, id) => {
        dispatch(Action.setMessage(''));
        dispatch(Action.changeRating(rate, id));
    };

    return { onRatingChange };
};

export default useRatingHook;

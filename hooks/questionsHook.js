import { useContext } from 'react';
import * as Action from './actions';
import { FeedbackState, FeedbackDispatch } from './context';


const useQuestionsHook = () => {
    const dispatch = useContext(FeedbackDispatch);
    const {
        questions,
        rating,
    } = useContext(FeedbackState);

    const onRatingChange = (rate, id) => {
        dispatch(Action.setMessage(''));
        dispatch(Action.changeRating(rate, id));
    };

    return {
        questions,
        rating,
        onRatingChange,
    };
};

export default useQuestionsHook;

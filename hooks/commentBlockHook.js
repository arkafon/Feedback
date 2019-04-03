import { useContext, useState } from 'react';
import * as Action from './actions';
import { TEXT_AREA_MAX_LENGTH } from './config';
import { FeedbackDispatch } from './context';


const useCommentBlockHook = () => {
    const dispatch = useContext(FeedbackDispatch);
    const [textLimit, setTextLimit] = useState(TEXT_AREA_MAX_LENGTH);

    const onTextAreaChange = (e) => {
        const { value } = e.target;

        dispatch(Action.setComments(value));
        dispatch(Action.setMessage(''));

        setTextLimit(TEXT_AREA_MAX_LENGTH - value.length);
    };

    return {
        textLimit,
        onTextAreaChange,
    };
};

export default useCommentBlockHook;

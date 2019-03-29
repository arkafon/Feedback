import React, { useContext } from 'react';
import { FeedbackState } from './hooks/context';
import { MessageBox } from './Feedback.styled';


const Message = () => {
    const {
        isSurveyDone,
        message,
    } = useContext(FeedbackState);

    return (
        <MessageBox
            hasMessage={!!message.length}
            isSurveyDone={isSurveyDone}
        >
            { message }
        </MessageBox>
    );
};


export default Message;

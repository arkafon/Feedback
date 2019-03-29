import React, { useContext } from 'react';
import { FeedbackState } from './hooks/context';
import * as Dict from './hooks/dict';
import { Header } from './Feedback.styled';


const Head = () => {
    const { isSurveyDone } = useContext(FeedbackState);

    return (
        <Header>
            { isSurveyDone ? Dict.TITLE_DONE : Dict.TITLE }
        </Header>
    );
};


export default Head;

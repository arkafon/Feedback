import React from 'react';
import PropTypes from 'prop-types';

import {
    FeedbackState,
    FeedbackDispatch,
} from './hooks/context';
import {
    Container,
    Content,
    ScrollableArea,
} from './Feedback.styled';
import Head from './Head';
import Message from './Message';
import FooterButtons from './FooterButtons';
import QuestionsList from './QuestionsList';
import CommentBlock from './CommentBlock';
import { useFeedback } from './hooks/feedbackHook';


const propTypes = {
    appId: PropTypes.string.isRequired,
    isForced: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

const Feedback = ({ appId, isForced, onClose }) => {
    const {
        state,
        dispatch,
    } = useFeedback(appId, isForced);

    const {
        isLoaded,
        isSending,
        isVisible,
        isSurveyDone,
    } = state;

    if (!isLoaded || !isVisible) return null;

    return (
        <Container>
            <FeedbackState.Provider value={state}>
                <FeedbackDispatch.Provider value={dispatch}>
                    <Head />
                    <Message />
                    { !isSurveyDone &&
                        <ScrollableArea isSending={isSending}>
                            <Content>
                                <QuestionsList />
                                <CommentBlock />
                            </Content>
                        </ScrollableArea>
                    }
                    <FooterButtons onClose={onClose} />
                </FeedbackDispatch.Provider>
            </FeedbackState.Provider>
        </Container>
    );
};

Feedback.propTypes = propTypes;


export default Feedback;

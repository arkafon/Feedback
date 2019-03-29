import React from 'react';
import map from 'lodash/map';
import Rating from './Rating';
import {
    QuestionListContainer,
    Question,
    Title,
    Description,
} from './QuestionsList.styled';
import useQuestionsHook from './hooks/questionsHook';


const QuestionsList = () => {
    const {
        questions,
        rating,
        onRatingChange,
    } = useQuestionsHook();

    if (!questions.headItems.length) return null;

    return (
        <QuestionListContainer>
            { map(questions.headItems, question => (
                <Question key={question.CritId}>
                    <Title>{ question.Title }</Title>
                    <Description>{ question.Descr }</Description>
                    <Rating
                        currentRate={rating[question.CritId] || question.Rate}
                        maxRate={question.MaxRate}
                        onChange={rate => onRatingChange(rate, question.CritId)}
                    />
                </Question>
            )) }
        </QuestionListContainer>
    );
};

export default QuestionsList;

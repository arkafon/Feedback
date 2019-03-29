import React from 'react';
import map from 'ramda/src/map';
import PropTypes from 'prop-types';
import Button from 'Components/core/Button';
import useFooterHook from './hooks/footerHook.js';

import { Footer } from './Feedback.styled';


const propTypes = {
    onClose: PropTypes.func.isRequired,
};

const FooterButtons = ({ onClose }) => {
    const {
        onSubmit,
        onRateLater,
        onDontAsk,
        isSurveyDone,
        isSending,
    } = useFooterHook();

    const onRateLaterWithCb = () => {
        onRateLater();
        onClose();
    };

    const onDontAskWithCb = () => {
        onDontAsk();
        onClose();
    };

    const buttons = {
        surveyDone: [
            {
                text: 'Закрыть',
                onClick: onRateLaterWithCb
            },
        ],
        surveyInProgress: [
            {
                text: (isSending ? 'Отправка' : 'Отправить'),
                onClick: onSubmit,
                disabled: isSending,
            },
            {
                text: 'Оценить позже',
                onClick: onRateLaterWithCb,
                disabled: isSending,
                color: '#384044',
            },
            {
                text: 'Больше не спрашивать',
                onClick: onDontAskWithCb,
                disabled: isSending,
                color: '#cc1919',
            },
        ],
    };

    const getButtonsGroup = map(
        el => <Button key={el.text} {...el} submit />
    );

    const Buttons = getButtonsGroup(
        buttons[isSurveyDone ? 'surveyDone' : 'surveyInProgress']
    );

    return (
        <Footer isSending={isSending}>
            { Buttons }
        </Footer>
    );
};

FooterButtons.propTypes = propTypes;


export default FooterButtons;

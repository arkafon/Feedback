import styled, { css, keyframes } from 'styled-components';
import starSolid from './assets/star-solid.svg';
import starRegular from './assets/star-regular.svg';


const fromLeftToRight = keyframes`
    from { background-position: 80px 160px; }
    to   { background-position: 0 0; }
`;

export const Container = styled.div`
    width: 480px;
    max-height: 70%;
    // min-height: 300px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 2px 5px #222;
    font-size: 14px;
    z-index: 100;
`;

export const Header = styled.div`
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    padding: 20px;
    margin-bottom: 10px;
`;

export const Content = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
`;

const scrollableAreaProps = {
    contentAfter: ({ isSending }) => (isSending ? '\'\'' : 'none'),
};

export const ScrollableArea = styled.div`
    overflow-y: auto;
    margin-right: 10px;
    position: relative;

    &::-webkit-scrollbar {
        width: 5px;
        background-color: #fff;
    }
    &::-webkit-scrollbar-track {
        width: 5px;
        background-color: #cecece;
        border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
        width: 5px;
        background-color: #aaa;
        border-radius: 3px;
    }

    &:after {
        content: ${scrollableAreaProps.contentAfter};
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        opacity: 0.6;
    }
`;

export const SubTitle = styled.div`
    font-size: 12px;
    color: #999;
`;

export const TextTitle = styled.div`
    font-weight: bold;
`;

export const TextArea = styled.textarea`
    border: 1px solid #e5e5e5;
    padding: 5px;
    font-size: 13px;
    resize: none;
`;

export const TextAreaHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const footerProps = {
    backgroundImage: ({ isSending }) => {
        if (isSending) {
            return `linear-gradient(
                45deg,
                rgba(0, 0, 0, 0.05) 25%,
                transparent         25%,
                transparent         50%,
                rgba(0, 0, 0, 0.05) 50%,
                rgba(0, 0, 0, 0.05) 75%,
                transparent         75%,
                transparent
            )`;
        }
        return 'none';
    },

    animation: ({ isSending }) => {
        if (isSending) {
            return css`${fromLeftToRight} 0.5s linear infinite`;
        }
        return 'none';
    },
};

export const Footer = styled.div`
    margin-top: 10px;
    color: #fff;
    background-color: #384044;
    padding: 10px;
    text-align: center;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    background-size: 80px 80px;
    background-image: ${footerProps.backgroundImage};

    animation: ${footerProps.animation};
`;

const messageBoxProps = {
    display: ({ hasMessage }) => (hasMessage ? 'block' : 'none'),
    marginBottom: ({ isSurveyDone }) => (isSurveyDone ? 0 : '10px'),
};

export const MessageBox = styled.div`
    display: ${messageBoxProps.display};
    background-color: #f5ebd9;
    padding: 10px 20px;
    margin-bottom: ${messageBoxProps.marginBottom};
    color: #630101;
`;

const ratingItemProps = {
    backgroundImage: ({ isSelected }) => (isSelected ? starSolid : starRegular),
};

export const RatingItem = styled.span`
    cursor: pointer;
    padding: 5px;
    background-image: url('${ratingItemProps.backgroundImage}');
    background-position: center 0;
    background-size: auto 20px;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: top;
    margin-right: 3px;

    // форсинг подгрузки изображения
    // чтобы при клике на компонент не было "мигания"
    &:before {
        content: '';
        background-image: url('${starSolid}');
    }
`;

export const QuestionListContainer = styled.div`
    margin-bottom: 20px;
`;

export const Question = styled.div`
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 0;
`;

export const Title = styled.div`
    font-weight: bold;
`;

export const Description = styled.div`
    margin: 10px 0;
    width: 100%;
`;

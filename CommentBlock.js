import React from 'react';
import { TEXT_AREA_MAX_LENGTH } from './hooks/config';
import useCommentBlockHook from './hooks/commentBlockHook';
import {
    TextAreaHeader,
    TextArea,
    TextTitle,
    SubTitle,
} from './Feedback.styled';


const CommentBlock = () => {
    const {
        textLimit,
        onTextAreaChange,
    } = useCommentBlockHook();

    return (
        <React.Fragment>
            <TextAreaHeader>
                <TextTitle>Комментарий</TextTitle>
                <SubTitle>осталось символов: {textLimit}</SubTitle>
            </TextAreaHeader>
            <TextArea
                maxLength={TEXT_AREA_MAX_LENGTH}
                rows={4}
                onChange={onTextAreaChange}
            />
        </React.Fragment>
    );
};


export default CommentBlock;

import { createContext } from 'react';

const FeedbackState = createContext(null);
const FeedbackDispatch = createContext(null);

export {
    FeedbackState,
    FeedbackDispatch,
};

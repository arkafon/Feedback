import reducer from '../hooks/reducer';

describe('reducer tests', () => {
    describe('action type doesn`t match test', () => {
        const action = { type: 'ACTION_DOES_NOT_EXIST' };

        it('should return current state', () => {
            const reducerResult = reducer({}, action);

            expect(reducerResult).toEqual({
                isLoaded: false,
                isSending: false,
                isSurveyDone: false,
                isVisible: false,
                message: '',
                questions: {
                    headItems: [],
                },
                rating: {},
            });
        });
    });

    describe('FETCH test', () => {
        const action = { type: 'FETCH' };

        it('should set `isLoaded` to `false`', () => {
            const reducerResult = reducer({}, action);

            expect(reducerResult).toEqual(
                expect.objectContaining({
                    isLoaded: false,
                })
            );
        });
    });

    describe('FETCH_SUCCESS test', () => {
        const action = { type: 'FETCH_SUCCESS' };

        it('should set `isVisible` to `false` if no data', () => {
            action.payload = {
                data: {
                    Status: '',
                    headItems: { results: [] },
                },
                isForsed: true,
            };

            expect(reducer({}, action)).toEqual(
                expect.objectContaining({
                    questions: expect.objectContaining({
                        headItems: expect.any(Array),
                    }),
                    isLoaded: true,
                    isVisible: false,
                })
            );
        });

        it('should set `isVisible` to `true` if `headItems` length not null and survey has not been passed ', () => {
            action.payload = {
                data: {
                    Status: '',
                    headItems: { results: [{ foo: 'bar' }] },
                },
                isForsed: true,
            };

            expect(reducer({}, action)).toEqual(
                expect.objectContaining({
                    questions: expect.objectContaining({
                        headItems: expect.arrayContaining([{ foo: 'bar' }]),
                    }),
                    isLoaded: true,
                    isVisible: true,
                })
            );
        });

        it('should set `isVisible` to `false` if `Status` not empty string and `isForced` falsy ', () => {
            action.payload = {
                data: {
                    Status: 'X',
                    headItems: { results: [{ foo: 'bar' }] },
                },
                isForced: false,
            };

            expect(reducer({}, action)).toEqual(
                expect.objectContaining({
                    questions: expect.objectContaining({
                        headItems: expect.arrayContaining([{ foo: 'bar' }]),
                    }),
                    isLoaded: true,
                    isVisible: false,
                })
            );
        });
    });

    describe('RATE_LATER test', () => {
        const action = { type: 'RATE_LATER' };

        it('should set `isVisible` to `false`', () => {
            const reducerResult = reducer({}, action);

            expect(reducerResult).toEqual(
                expect.objectContaining({
                    isVisible: false,
                })
            );
        });
    });

    describe('CHANGE_RATING test', () => {
        const action = { type: 'CHANGE_RATING' };

        it('should set `rating` node to payload`s rate value and', () => {
            action.payload = {
                id: 1,
                rate: 2,
            };

            const reducerResult = reducer({
                rating: {},
                questions: {
                    headItems:  [
                        {
                            CritId: 1,
                            Rate: 0,
                        },
                        {
                            CritId: 2,
                            Rate: 0,
                        }
                    ],
                }
            }, action);

            expect(reducerResult).toEqual(
                expect.objectContaining({
                    rating: { 1: 2 },
                    questions: expect.objectContaining({
                        headItems: expect.arrayContaining([
                            expect.objectContaining({ Rate: 2 })
                        ])
                    }),
                })
            );
        });
    });

    describe('SET_SURVEY_DONE test', () => {
        const action = { type: 'SET_SURVEY_DONE' };

        it('should set `isSurveyDone` to `true`', () => {
            const reducerResult = reducer({}, action);

            expect(reducerResult).toEqual(
                expect.objectContaining({
                    isSurveyDone: true,
                })
            );
        });
    });

    describe('SENDING test', () => {
        const action = { type: 'SENDING' };

        it('should set `isSending` to `true`', () => {
            const reducerResult = reducer({}, action);

            expect(reducerResult).toEqual(
                expect.objectContaining({
                    isSending: true,
                })
            );
        });
    });

    describe('SENT test', () => {
        const action = { type: 'SENT' };

        it('should set `isSending` to `false`', () => {
            const reducerResult = reducer({}, action);

            expect(reducerResult).toEqual(
                expect.objectContaining({
                    isSending: false,
                })
            );
        });
    });

    describe('SET_MESSAGE test', () => {
        const action = {
            type: 'SET_MESSAGE',
            payload: 'some message',
        };

        it('should set `message` value from payload', () => {
            const reducerResult = reducer({}, action);

            expect(reducerResult).toEqual(
                expect.objectContaining({
                    message: 'some message',
                })
            );
        });
    });

    describe('SET_COMMENTS test', () => {
        const action = {
            type: 'SET_COMMENTS',
            payload: 'new comment',
        };

        it('should set `message` value from payload', () => {
            const reducerResult = reducer({
                questions: {
                    Comments: 'old comment',
                }
            }, action);

            expect(reducerResult).toEqual(
                expect.objectContaining({
                    questions: {
                        Comments: 'new comment',
                    }
                })
            );
        });
    });
});

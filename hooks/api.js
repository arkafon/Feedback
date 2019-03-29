import axios from 'axios';
import { ROOT } from './config';


const X_CSRF_TOKEN_SYMBOL = Symbol('csrf token');

const processResponse = (response) => {
    const xCsrfToken = response.headers && response.headers['x-csrf-token'];

    if (xCsrfToken) {
        window[X_CSRF_TOKEN_SYMBOL] = xCsrfToken;
    }

    return response;
};

export const metadataRequest = () =>
    axios.get(
        `${ROOT}$metadata`,
        {
            headers: {
                'X-CSRF-TOKEN': 'Fetch'
            }
        }
    ).then(processResponse);

const getXCSRFTokenObject = () => ({
    'X-CSRF-TOKEN': window[X_CSRF_TOKEN_SYMBOL],
});

export const fetchFeedback = AppId =>
    axios.get(`${ROOT}heads(AppId='${AppId}',AppVer='')`, {
        params: {
            $expand: 'headItems',
            $format: 'json',
        },
    });

export const sendFeedback = requestBody =>
    axios.post(`${ROOT}heads`, requestBody, {
        headers: getXCSRFTokenObject(),
    });

export const FEEDBACK_SERVICE = 'ZSB_HR_CM_FEEDBACK_SRV';
export const ODATA_PATH = '/sap/opu/odata/sap/';

export const PROXY_PREFIX = (window.location.hostname === 'localhost') ?
    '/proxy' : '';

export const ROOT = `${PROXY_PREFIX}${ODATA_PATH}${FEEDBACK_SERVICE}/`;
export const TEXT_AREA_MAX_LENGTH = 1000;

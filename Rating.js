import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import range from 'lodash/range';

import { RatingItem } from './Feedback.styled';


const propTypes = {
    currentRate: PropTypes.number.isRequired,
    maxRate: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Rating = ({
    currentRate,
    maxRate,
    onChange,
}) => {
    const rates = range(1, maxRate + 1);

    return map(rates, rate => (
        <RatingItem
            key={rate}
            onClick={() => onChange(rate)}
            isSelected={currentRate >= rate}
        />
    ));
};

Rating.propTypes = propTypes;


export default Rating;

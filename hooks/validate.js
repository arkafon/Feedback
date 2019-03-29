import reduce from 'ramda/src/reduce';
import find from 'ramda/src/find';
import filter from 'ramda/src/filter';
import propEq from 'ramda/src/propEq';
import * as Dict from './dict';


const isEnougthRate = rate => (rate.Rate / rate.MaxRate >= 0.8);
const ratesSum = (acc, rate) => acc + Number(rate.Rate);
const getRatesTotal = reduce(ratesSum, 0);
const getRatesHasNull = find(propEq('Rate', 0));
const getRatesHasEnougthRate = filter(isEnougthRate);

const validate = (questions) => {
    const rates = questions.headItems || [];
    const ratesTotal = getRatesTotal(rates);
    const ratesHasNull = getRatesHasNull(rates);
    const ratesHasEnougthRate = getRatesHasEnougthRate(rates);
    const result = {
        isValid: true,
        message: '',
    };

    if (ratesTotal === 0 || ratesHasNull) {
        result.isValid = false;
        result.message = Dict.MESSAGE_RATEALLCRITERIAS;

        return result;
    }

    if (
        ratesHasEnougthRate.length !== rates.length &&
        questions.Comments.length === 0
    ) {
        result.isValid = false;
        result.message = Dict.MESSAGE_LOWRATEEXPLANATION;

        return result;
    }

    return result;
};


export default validate;

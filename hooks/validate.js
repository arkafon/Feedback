import * as Dict from './dict';


const isEnougthRate = rate => (rate.Rate / rate.MaxRate >= 0.8);
const ratesSum = (acc, rate) => acc + Number(rate.Rate);
const getRatesTotal = rates => rates.reduce(ratesSum, 0);
const getRatesHasNull = rates => rates.find(i => i.Rate === 0);
const getRatesHasEnougthRate = rates => rates.filter(isEnougthRate);

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

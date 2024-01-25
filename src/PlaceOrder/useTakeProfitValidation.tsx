import { useState } from "react";
import {ProfitTarget} from "./model.ts";

const useTakeProfitValidation = (profitTargets: ProfitTarget[]) => {

    const [validationErrors, setValidationErrors] = useState({
        maxProfitSum: "",
        minProfitValue: "",
        increasingProfit: "",
        positiveTargetPrice: "",
        maxAmountSum: ""
    });

    const validateForm = () => {
        setValidationErrors({
            maxProfitSum: "",
            minProfitValue: "",
            increasingProfit: "",
            positiveTargetPrice: "",
            maxAmountSum: ""

        });

        const maxProfitSumError = validateMaxProfitSum(profitTargets);
        const minProfitValueError = validateMinProfitValue(profitTargets);
        const increasingProfitError = validateIncreasingProfit(profitTargets);
        const positiveTargetPriceError = validatePositiveTargetPrice(profitTargets);
        const maxAmountSumError = validateMaxAmountSum(profitTargets);

        setValidationErrors({
            maxProfitSum: maxProfitSumError,
            minProfitValue: minProfitValueError,
            increasingProfit: increasingProfitError,
            positiveTargetPrice: positiveTargetPriceError,
            maxAmountSum: maxAmountSumError
        });


        return (
            !maxProfitSumError &&
            !minProfitValueError &&
            !increasingProfitError &&
            !positiveTargetPriceError &&
            !maxAmountSumError

        );
    };

    const validateMaxProfitSum = (targets: ProfitTarget[]) => {
        const totalProfit = targets.reduce((sum, target) => sum + target.profit, 0);
        return totalProfit > 500 ? "Maximum profit sum is 500%" : "";
    };

    const validateMinProfitValue = (targets: ProfitTarget[]) => {
        const invalidTargets = targets.filter((target) => target.profit < 0.01);
        return invalidTargets.length > 0 ? "Minimum value is 0.01%" : "";
    };

    const validateIncreasingProfit = (targets: ProfitTarget[]) => {
        for (let i = 1; i < targets.length; i++) {
            if (targets[i].profit <= targets[i - 1].profit) {
                return "Each target's profit should be greater than the previous one";
            }
        }
        return "";
    };

    const validatePositiveTargetPrice = (targets: ProfitTarget[]) => {
        const invalidTargets = targets.filter((target) => target.price <= 0);
        return invalidTargets.length > 0 ? "Price must be greater than 0" : "";
    };

    const validateMaxAmountSum = (targets: ProfitTarget[]) => {
        const totalAmount = targets.reduce((sum, target) => sum + target.amount, 0);
        const currentAmount = totalAmount - 100;

        return currentAmount > 0
            ? `${totalAmount}% out of 100% selected. Please decrease by ${currentAmount}%.`
            : "";
    };


    return {
        validationErrors,
        validateForm,
    };
};

export default useTakeProfitValidation;

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";

import useMultistep from "../../hooks/useMultistep";
import Logger from "../../internal/Logger";
import Card from "../../shared/ui/card/Card";
import Loading from "../../shared/loading/Loading";

import IntroductionStep from "./steps/IntroductionStep";
import PersonalIdentificationStep from "./steps/PersonalIdentificationStep";
import ResidentialInformationStep from "./steps/ResidentialInformationStep";
import ContactInformationStep from "./steps/ContactInformationStep";
import EmploymentEducationStep from "./steps/EmploymentEducationStep";
import ConsentStep from "./steps/ConsentStep";
import ReviewSubmitStep from "./steps/ReviewSubmitStep";
import ConfirmationStep from "./steps/ConfirmationStep";

export default function SurveyFlow() {
    const logger = useMemo(() => new Logger('SurveyOrderFlow'), []);
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    // Define the _steps of the survey
    const steps = [
        IntroductionStep,
        ConsentStep,
        PersonalIdentificationStep ,
        ResidentialInformationStep ,
        ContactInformationStep ,
        EmploymentEducationStep  ,
        ReviewSubmitStep,
        ConfirmationStep
    ];

    useEffect(() => {
        // Perform initial data setup or load from context/API if needed
    }, []);

    function upsertFields(fields) {
        setData(prev => ({ ...prev, ...fields }));
    }

    const { Step, back, next, isFirstStep, isLastStep } = useMultistep(steps);

    async function submit() {
        logger.log("Submitting survey data:", data);
        setIsLoading(true);

        // Replace with actual API endpoint and method to submit survey data
        await fetch('/api/survey', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                logger.log("Survey submission successful", json);
            })
            .catch(error => {
                logger.log("Error submitting survey", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            {isLoading && <Loading />}
            <Card>
                <Step
                    data={data}
                    upsertFields={upsertFields}
                    next={next}
                    back={back}
                    submit={submit}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                />
            </Card>
        </>
    );
}

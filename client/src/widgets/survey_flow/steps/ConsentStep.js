import React, { useState } from 'react';
import Card from "../../../shared/ui/card/Card";
import CardBody from "../../../shared/ui/card/CardBody";
import Typography from "../../../shared/ui/typography/Typography";
import Checkbox from "../../../shared/ui/checkbox/Checkbox"; // Make sure to have a Checkbox component
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import GroupInput from "../_group_input/GroupInput";

function ConsentStep({ data, upsertFields, next, back, isLastStep, submit }) {
    // State for managing consent checkbox
    const [consentGiven, setConsentGiven] = useState(data.consent || false);

    const handleConsentChange = (e) => {
        const newConsentValue = e.target.checked;
        setConsentGiven(newConsentValue);
        upsertFields({ consent: newConsentValue });
    };

    function onSubmitHandler(e) {
        e.preventDefault();

        // Ensure consent is given before allowing the user to proceed
        if (!consentGiven) {
            alert('Please provide your consent to proceed.');
            return;
        }

        if (isLastStep) {
            return submit();
        }
        return next();
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <Card>
                <CardBody>
                    <Typography size={20} weight={700} align={'center'}>
                        Пользовательское соглашение
                    </Typography>
                    <GroupInput>
                        <Typography size={16} weight={400}>
                            Согласны ли вы с условиями проведения переписи населения?
                        </Typography>
                        <Typography size={14} weight={400}>
                            Вы можете просмотреть <a href="https://drive.google.com/file/d/192hLa1mDpMiOA4Aal_r8MZxqRpl7BCqg/view?usp=sharing" target="_blank"> условия пользовательского соглашения здесь</a>.
                        </Typography>
                        <Checkbox
                            label="Я принимаю условия соглашения."
                            checked={consentGiven}
                            onChange={handleConsentChange}
                        />
                    </GroupInput>
                    <_NavigationButtons back={back} isLastStep={isLastStep} />
                </CardBody>
            </Card>
        </form>
    );
}

export default ConsentStep;

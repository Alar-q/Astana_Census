import React from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import CardBody from "../../../shared/ui/card/CardBody";
import Card from "../../../shared/ui/card/Card";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import Logger from "../../../internal/Logger";

export default function FinalReviewStep({
                                            data = {},
                                            next = f => f,
                                            back = f => f,
                                            submit = f => f,
                                            isFirstStep = false,
                                            isLastStep = true, // This is always the last step
                                        }) {
    const logger = new Logger('FinalReviewStep');

    const handleSubmit = (e) => {
        e.preventDefault();
        logger.log('Finalizing Survey', data);
        submit();
    };

    // Function to render data for review
    const renderDataForReview = (data) => {
        return Object.entries(data).map(([key, value], index) => {
            // For simplicity, assuming all values are scalar
            // You'd need to handle nested objects/arrays appropriately
            return (
                <div key={index}>
                    <Typography size={16} weight={500}>{`${key}: ${value}`}</Typography>
                </div>
            );
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardBody>
                    <Block isAlignCenter={true} bottom={40}>
                        <Typography size={20} weight={700} align={'center'}>Review Your Details</Typography>
                    </Block>
                    <Block>
                        {renderDataForReview(data)}
                    </Block>
                </CardBody>
                <_NavigationButtons back={back} next={handleSubmit} isLastStep={isLastStep}/>
            </Card>
        </form>
    );
}

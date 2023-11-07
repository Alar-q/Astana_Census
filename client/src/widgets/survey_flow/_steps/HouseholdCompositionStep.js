import React from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import MyInput from "../../../entities/order/new/_MyInput";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import CardBody from "../../../shared/ui/card/CardBody";
import Card from "../../../shared/ui/card/Card";
import Logger from "../../../internal/Logger";

export default function HouseholdCompositionStep({
                                                     data = {},
                                                     upsertFields = f => f,
                                                     next = f => f,
                                                     back = f => f,
                                                     isFirstStep = false,
                                                     isLastStep = false,
                                                 }) {
    const logger = new Logger('HouseholdCompositionStep');

    const handleSubmit = (e) => {
        e.preventDefault();
        logger.log('Submitting Household Details', data);
        if (isLastStep) {
            // If this is the last step, we want to submit the data
            // submit(); // Uncomment when the submit function is implemented
        } else {
            next();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardBody>
                    <Block isAlignCenter={true} bottom={40}>
                        <Typography size={20} weight={700} align={'center'}>Household Composition</Typography>
                    </Block>
                    <GroupInput top={20}>
                        <MyInput
                            placeHolder='Number of Adults'
                            name='numberOfAdults'
                            type='number'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />
                        <MyInput
                            placeHolder='Number of Children'
                            name='numberOfChildren'
                            type='number'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />
                        <MyInput
                            placeHolder='Number of Rooms'
                            name='numberOfRooms'
                            type='number'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />
                    </GroupInput>
                </CardBody>
                <_NavigationButtons isLastStep={isLastStep} isFirstStep={isFirstStep} back={back} next={next}/>
            </Card>
        </form>
    );
}

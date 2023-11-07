import React, { useState, useEffect } from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import MyInput from "../../../entities/order/new/_MyInput";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import CardBody from "../../../shared/ui/card/CardBody";
import Card from "../../../shared/ui/card/Card";
import Logger from "../../../internal/Logger";

export default function PersonalDetailsStep({
                                                data = {},
                                                upsertFields = f => f,
                                                next = f => f,
                                                back = f => f,
                                                isFirstStep = false,
                                                isLastStep = false,
                                            }) {
    const logger = new Logger('PersonalDetailsStep');




    const handleSubmit = (e) => {
        e.preventDefault();
        logger.log('Submitting Personal Details', data);
        // Here you could do additional validation before moving to the next step
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
                        <Typography size={20} weight={700} align={'center'}>Personal Details</Typography>
                    </Block>
                    <GroupInput top={20}>
                        <MyInput
                            placeHolder='Full Name'
                            name='fullName'
                            type='text'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />
                        <MyInput
                            placeHolder='Age'
                            name='age'
                            type='number'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />
                        <MyInput
                            placeHolder='Gender'
                            name='gender'
                            type='text'
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

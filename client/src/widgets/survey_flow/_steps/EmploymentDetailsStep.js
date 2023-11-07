import React from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import MyInput from "../../../entities/order/new/_MyInput";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import CardBody from "../../../shared/ui/card/CardBody";
import Card from "../../../shared/ui/card/Card";
import Logger from "../../../internal/Logger";

export default function EmploymentDetailsStep({
                                                  data = {},
                                                  upsertFields = f => f,
                                                  next = f => f,
                                                  back = f => f,
                                                  isFirstStep = false,
                                                  isLastStep = false,
                                              }) {
    const logger = new Logger('EmploymentDetailsStep');

    const handleSubmit = (e) => {
        e.preventDefault();
        logger.log('Submitting Employment Details', data);
        if (isLastStep) {
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
                        <Typography size={20} weight={700} align={'center'}>Employment Details</Typography>
                    </Block>
                    <GroupInput top={20}>
                        <MyInput
                            placeHolder='Occupation'
                            name='occupation'
                            type='text'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />
                        <MyInput
                            placeHolder='Employment Status'
                            name='employmentStatus'
                            type='text'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />
                        {/* If you have more employment details to collect, add more input fields here */}
                    </GroupInput>
                </CardBody>
                <_NavigationButtons isLastStep={isLastStep} isFirstStep={isFirstStep} back={back} next={next}/>
            </Card>
        </form>
    );
}

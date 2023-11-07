import React, {useState} from 'react';
import Card from "../../../shared/ui/card/Card";
import CardBody from "../../../shared/ui/card/CardBody";
import Typography from "../../../shared/ui/typography/Typography";
import MyInput from "../../../entities/order/new/_MyInput";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import _SelectGender from "../_select_gender/_SelectGender";
import _SelectCity from "../_select_city/_SelectCity";
import GroupInput from "../_group_input/GroupInput";

function ResidentialInformationStep({ data, upsertFields, next, back, isLastStep, submit }) {
    function onSubmitHandler(e) {
        e.preventDefault();
        return next();
    }
    // Assuming you have a component like _SelectCity for address selection
    return (
        <form onSubmit={onSubmitHandler}>
            <Card>
                <CardBody>
                    <Typography size={20} weight={700} align={'center'}>
                        Информация о жилье
                    </Typography>
                    <GroupInput>
                        <label>Город</label>
                        <_SelectCity
                            selectOption={data.city || ''}
                            handleOnSelect={selectedOption => {
                                upsertFields({ city: selectedOption ? selectedOption.value : '' });
                            }}
                        />
                        <label>Улица</label>
                        <MyInput
                            placeHolder='Street Address'
                            name='streetAddress'
                            type='text'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />
                        {/* Include additional address fields as necessary */}
                    </GroupInput>
                    <_NavigationButtons back={back} next={next} />
                </CardBody>
            </Card>
        </form>
    );
}
export default ResidentialInformationStep;

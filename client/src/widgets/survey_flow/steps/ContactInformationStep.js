import React, {useState} from 'react';
import Card from "../../../shared/ui/card/Card";
import CardBody from "../../../shared/ui/card/CardBody";
import Typography from "../../../shared/ui/typography/Typography";
import MyInput from "../../../entities/order/new/_MyInput";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import _SelectGender from "../_select_gender/_SelectGender";
import GroupInput from "../_group_input/GroupInput";
import InputPhone from "../../../shared/ui/input_phone/InputPhone";

function ContactInformationStep({ data, upsertFields, next, back, isLastStep, submit }) {
    function onSubmitHandler(e) {
        e.preventDefault();

        return next();
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <Card>
                <CardBody>
                    <Typography size={20} weight={700} align={'center'}>
                        Контактная информация
                    </Typography>
                    <GroupInput>
                        <label>E-Mail Адрес</label>
                        <MyInput
                            placeHolder='Email Address'
                            name='email'
                            type='email'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />
                        <label>Номер телефона</label>
                        <InputPhone value={data.phoneNumber} onChange={phone=>upsertFields({phoneNumber: phone})}/>

                    </GroupInput>
                    <_NavigationButtons back={back} next={next} />
                </CardBody>
            </Card>
        </form>
    );
}
export default ContactInformationStep;

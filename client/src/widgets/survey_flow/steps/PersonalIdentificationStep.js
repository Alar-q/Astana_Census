import React, {useState} from 'react';
import Card from "../../../shared/ui/card/Card";
import CardBody from "../../../shared/ui/card/CardBody";
import Typography from "../../../shared/ui/typography/Typography";
import MyInput from "../../../entities/order/new/_MyInput";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import _SelectGender from "../_select_gender/_SelectGender";
import GroupInput from "../_group_input/GroupInput";


function PersonalIdentificationStep({ data, upsertFields, next, back, isLastStep, submit }) {
    function onSubmitHandler(e) {
        // if(data.idNumber > 999_999_999_99 || data.idNumber < 10_000_000_000){
        //     return;
        // }
        e.preventDefault();

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
                        Личные данные
                    </Typography>
                    <GroupInput>
                        <label>ФИО</label>
                        <MyInput
                            placeHolder='Полное имя'
                            name='fullName'
                            type='text'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />

                        <label>Дата рождения</label>
                        <MyInput
                            placeHolder='Date of Birth'
                            name='dateOfBirth'
                            type='date'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />

                        <label>Пол</label>
                        <_SelectGender selectedGender={data.gender || ''} handleGenderSelect={selectedOption => {
                            upsertFields({ gender: selectedOption ? selectedOption.value : '' });
                        }} />

                        <label>ИИН</label>
                        <MyInput
                            placeHolder='Введите ИИН'
                            name='idNumber'
                            type='number'
                            data={data}
                            upsertFields={upsertFields}
                            required={true}
                        />
                    </GroupInput>
                    <_NavigationButtons back={back} />
                </CardBody>
            </Card>
        </form>
    );
}
export default PersonalIdentificationStep;

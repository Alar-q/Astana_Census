import React from 'react';
import Card from "../../../shared/ui/card/Card";
import CardBody from "../../../shared/ui/card/CardBody";
import Typography from "../../../shared/ui/typography/Typography";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";

import Select from "react-select";
import GroupInput from "../_group_input/GroupInput";
function _Select({ name, placeholder, selected, onChange, options, value, required }) {
    return (
        <Select
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: '1px solid rgba(30, 38, 47, 0.06)',
                    boxShadow: '2px 4px 4px rgba(30, 38, 47, 0.02)',
                    borderRadius: 16,
                    padding: '8px 8px',
                    fontSize: '14px',
                    color: '#a3a1a1',
                    marginBottom: '10px',
                }),
                clearIndicator: (base) => ({
                    ...base,
                    position: 'absolute',
                    right: 0,
                }),
            }}
            name={name}
            placeholder={placeholder}
            options={options}
            classNamePrefix="select"
            isClearable={true}
            isSearchable={false}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
}
function EmploymentEducationStep({ data, upsertFields, next, back, isLastStep, submit }) {
    const occupations = [
        { label: "Не работаю", value: "unemployed" },
        { label: "Студент", value: "student" },
        { label: "Работаю", value: "employed" },
        // Add more options as needed
    ];

    const educationLevels = [
        { label: "Начальное образование", value: "elementary" },
        { label: "Среднее образование", value: "secondary" },
        { label: "Высшее образование", value: "higher" },
        // Add more options as needed
    ];

    function onSubmitHandler(e) {
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
                        Трудоустройство и образование
                    </Typography>
                    <GroupInput>
                        <label>Занятость</label>
                        <_Select
                            placeholder='Выберите вашу занятость'
                            options={occupations}
                            value={occupations.find(option => option.value === data.occupation)}
                            onChange={selectedOption => upsertFields({ occupation: selectedOption.value })}
                            required={true}
                        />
                        <label>Уровень образования</label>
                        <_Select
                            placeholder='Выберите уровень образования'
                            options={educationLevels}
                            value={educationLevels.find(option => option.value === data.educationLevel)}
                            onChange={selectedOption => upsertFields({ educationLevel: selectedOption.value })}
                            required={true}
                        />
                    </GroupInput>
                    <_NavigationButtons back={back} isLastStep={isLastStep} />
                </CardBody>
            </Card>
        </form>
    );
}

export default EmploymentEducationStep;

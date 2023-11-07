import React from 'react';
import Select from "react-select";

const genderOptions = [
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
    { value: 'other', label: 'Другой' },
];

function _SelectGender({ selectedGender, handleGenderSelect }) {
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
            name={'city'}
            placeholder="Укажите пол"
            options={genderOptions}
            classNamePrefix="select"
            isClearable={true}
            isSearchable={false}
            value={genderOptions.find(option => option.value === selectedGender)}
            onChange={handleGenderSelect}
        />
    );
}

export default _SelectGender;

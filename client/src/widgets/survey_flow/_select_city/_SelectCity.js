import React, {useEffect, useMemo, useState} from "react";
import Select from "react-select";
import {useAppContext} from "../../../context/AppContext";
import Logger from "../../../internal/Logger";

const CITIES = [
    "Астана",
    "Алматы",
    "Шымкент",
    "Караганда",
    "Актобе",
    "Тараз",
    "Павлодар",
    "Усть-Каменогорск",
    "Семей",
    "Кызылорда",
    "Костанай",
    "Атырау",
    "Актау",
    "Темиртау",
    "Туркестан",
    "Талдыкорган",
    "Экибастуз",
    "Кокшетау",
    "Рудный",
    "Жезказган",
    "Петропавловск",
    "Талгар",
    "Кентау",
    "Кульсары",
    "Байконур",
    "Риддер",
    "Сатпаев",
    "Зыряновск",
    "Аркалык",
    "Лисаковск",
];

export default function _SelectCity({selectOption, handleOnSelect=f=>f}) {

    const logger = useMemo(()=>new Logger('_SelectCity'), [])

    const [cities, ] = useState(CITIES);

    const [inputText, setInputText] = useState('')

    const handleInputChange = (inputText, meta) => {
        if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
            setInputText(inputText)
        }
    }

    const [cityOptions, setCityOptions] = useState([]);

    useEffect(()=>{
        const c = cities.map(obj => ({label: obj, value: obj,}));
        logger.log({cities, cityOptions: c});
        setCityOptions(c);
    },[cities])


    return(<>
        <Select
            placeholder={'Введите город'}
            options={cityOptions}
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
            components={{
                // …
                IndicatorSeparator: () => null,
            }}
            value={cityOptions.find(obj => obj.value === selectOption)}
            inputValue={inputText}
            onInputChange={handleInputChange}
            onChange={handleOnSelect}
            required
        />
    </>)
}
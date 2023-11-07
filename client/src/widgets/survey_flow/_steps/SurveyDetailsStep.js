import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import NewRangeDatepicker from "../../../shared/range_datepicker/NewRangeDatepicker";
import Iterator from "../../../shared/ui/iterator/Iterator";
import KidsBox from "../../../shared/kids_box/KidsBox";
import Block from "../../../shared/ui/block/Block";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import Button from "../../../shared/ui/button/Button";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import CardBody from "../../../shared/ui/card/CardBody";
import Card from "../../../shared/ui/card/Card";
import Logger from "../../../internal/Logger";
import Typography from "../../../shared/ui/typography/Typography";

export default function SurveyDetailsStep({
    data = {},
    cities = [],
    upsertFields = f => f,
    next = f => f,
    back = f => f,
    isFirstStep = false,
    isLastStep = false,
    submit = f => f
}) {
    const logger = new Logger('SurveyDetailsStep');
    const [cityOptions, setCityOptions] = useState([]);

    useEffect(() => {
        setCityOptions(cities.map(city => ({ label: city.name, value: city.id })));
    }, [cities]);

    const handleCityChange = selectedOption => {
        upsertFields({ city: selectedOption });
    };

    const handleDateRangeChange = dateRange => {
        upsertFields({ dateRange });
    };

    const handleAdultsChange = number => {
        upsertFields({ numberOfAdults: number });
    };

    const handleKidsChange = kidsAges => {
        upsertFields({ kidsAges });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (isLastStep) {
            submit();
        } else {
            next();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardBody>
                    <Block isAlignCenter={true} bottom={20}>
                        <Typography size={20} weight={700} align={'center'}>Survey Details</Typography>
                    </Block>

                    <label htmlFor="city-select">City</label>
                    <Select
                        id="city-select"
                        options={cityOptions}
                        onChange={handleCityChange}
                        value={cityOptions.find(option => option.value === data.city)}
                        required
                    />

                    <Block top={15}>
                        <label htmlFor="date-range">Date Range</label>
                        <NewRangeDatepicker
                            initialDateRange={data.dateRange}
                            onChangeDates={handleDateRangeChange}
                        />
                    </Block>

                    <GroupInput top={15}>
                        <Block>
                            <label htmlFor="adults-iterator">Number of Adults</label>
                            <Iterator
                                id="adults-iterator"
                                minValue={1}
                                value={data.numberOfAdults}
                                onChange={handleAdultsChange}
                            />
                        </Block>
                        <Block>
                            <label htmlFor="kids-box">Children's Ages</label>
                            <KidsBox
                                id="kids-box"
                                onChangeKids={handleKidsChange}
                                value={data.kidsAges}
                            />
                        </Block>
                    </GroupInput>

                    <_NavigationButtons isFirstStep={isFirstStep} isLastStep={isLastStep} back={back} next={next} />
                </CardBody>
            </Card>
        </form>
    );
}

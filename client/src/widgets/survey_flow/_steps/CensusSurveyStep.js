import React, { useState } from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import CheckboxService from "../../../shared/ui/checkbox_service/CheckboxService";
import CardBody from "../../../shared/ui/card/CardBody";
import Card from "../../../shared/ui/card/Card";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";

import PopulationIcon from '../../../assets/icons/bed_icon.svg'
import EmploymentIcon from '../../../assets/icons/bed_icon.svg'
import HousingIcon from '../../../assets/icons/ticket_icon.svg'
import EducationIcon from '../../../assets/icons/transfer_icon.svg'


export default function CensusSurveyStep({
                                             data = {},
                                             upsertFields = f => f,
                                             next = f => f,
                                             back = f => f,
                                             isFirstStep = false,
                                             isLastStep = false,
                                         }) {
    // Assuming 'surveySelections' is the key in 'data' where we store the selected survey sections
    const [surveySelections, setSurveySelections] = useState(data.surveySelections || []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSurveySelections(prev => {
            const newSelections = checked
                ? [...prev, value]
                : prev.filter(selection => selection !== value);
            upsertFields({ surveySelections: newSelections });
            return newSelections;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (surveySelections.length === 0) {
            // Handle validation error
            return;
        }
        if (isLastStep) {
            // Handle final submission
        } else {
            next();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardBody>
                    <Block isAlignCenter={true} bottom={20}>
                        <Typography size={20} weight={700} align={'center'}>Census Survey Sections</Typography>
                    </Block>

                    <CheckboxService
                        Icon={<PopulationIcon />}
                        title='Population'
                        name='surveySelections'
                        value='population'
                        onChange={handleCheckboxChange}
                        isChecked={surveySelections.includes('population')}
                    />
                    <CheckboxService
                        Icon={<EmploymentIcon />}
                        title='Employment'
                        name='surveySelections'
                        value='employment'
                        onChange={handleCheckboxChange}
                        isChecked={surveySelections.includes('employment')}
                    />
                    <CheckboxService
                        Icon={<HousingIcon />}
                        title='Housing'
                        name='surveySelections'
                        value='housing'
                        onChange={handleCheckboxChange}
                        isChecked={surveySelections.includes('housing')}
                    />
                    <CheckboxService
                        Icon={<EducationIcon />}
                        title='Education'
                        name='surveySelections'
                        value='education'
                        onChange={handleCheckboxChange}
                        isChecked={surveySelections.includes('education')}
                    />
                    {/* Add more checkboxes as needed for different census sections */}
                </CardBody>
                <_NavigationButtons isFirstStep={isFirstStep} isLastStep={isLastStep} back={back} next={next} />
            </Card>
        </form>
    );
}

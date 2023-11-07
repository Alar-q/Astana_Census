import React from 'react';
import Card from "../../../shared/ui/card/Card";
import CardBody from "../../../shared/ui/card/CardBody";
import Typography from "../../../shared/ui/typography/Typography";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import EditableField from "../_editable_fields/EditableField";

function ReviewSubmitStep({ data, upsertFields, next, back, isLastStep, submit }) {

    // This function will be called when an individual field is edited and confirmed
    const handleFieldUpdate = (fieldName, newValue) => {
        upsertFields({ [fieldName]: newValue });
    };

    function onSubmitHandler(e) {
        e.preventDefault();

        submit();
        return next();
    }

    // Generate the list of data fields as editable components
    const dataReviewList = Object.entries(data).map(([field, value]) => (
        <EditableField
            key={field}
            name={field}
            value={value}
            onConfirm={handleFieldUpdate}
        />
    ));

    return (
        <form onSubmit={onSubmitHandler}>
            <Card>
                <CardBody>
                    <Typography size={20} weight={700} align={'center'}>
                        Просмотр и отправка
                    </Typography>
                    <GroupInput>
                        {/* Display all data entered for review */}
                        {dataReviewList}
                        {/* Fields are now editable for any last minute changes */}
                    </GroupInput>
                    <_NavigationButtons back={back} next={submit} isSubmit={isLastStep} />
                </CardBody>
            </Card>
        </form>
    );
}

export default ReviewSubmitStep;

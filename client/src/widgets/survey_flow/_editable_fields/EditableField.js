import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from "../../../shared/ui/typography/Typography";
import Button from "../../../shared/ui/button/Button"; // Hypothetical Button component

function EditableField({ name, value, onConfirm }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setCurrentValue(value); // Revert to original value
        setIsEditing(false);
    };

    const handleOkClick = () => {
        onConfirm(name, currentValue); // Call the provided onConfirm function with the new value
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setCurrentValue(e.target.value);
    };

    return (
        <div>
            {!isEditing ? (
                <Typography onClick={handleEditClick}>
                    {name}: {value}
                </Typography>
            ) : (
                <div>
                    <input type="text" value={currentValue} onChange={handleChange} />
                    <Button onClick={handleOkClick}>OK</Button>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                </div>
            )}
        </div>
    );
}

EditableField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default EditableField;

import React from 'react';
import Card from "../../../shared/ui/card/Card";
import CardBody from "../../../shared/ui/card/CardBody";
import Typography from "../../../shared/ui/typography/Typography";
import Button from "../../../shared/ui/button/Button";
import {useNavigate} from "react-router-dom";

function ConfirmationStep({ data, upsertFields, next, back, isLastStep, submit, restartSurvey=f=>f}) {
    const navigate = useNavigate();
    function onSubmitHandler(e) {
        e.preventDefault();
        return (()=>{})();
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <Card>
                <CardBody>
                    <Typography size={20} weight={700} align={'center'}>
                        Спасибо!
                    </Typography>
                    <Typography size={16} weight={400} align={'center'}>
                        Ваши ответы успешно отправлены. Благодарим вас за вклад в проведение переписи населения Астаны 2023 года.
                    </Typography>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button onClick={()=>navigate('/survey')}>Завершить еще один опрос.</Button>
                    </div>
                </CardBody>
            </Card>
        </form>
    );
}

export default ConfirmationStep;

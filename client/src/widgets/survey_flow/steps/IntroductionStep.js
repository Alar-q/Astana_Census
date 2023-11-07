import React from 'react';
import Card from "../../../shared/ui/card/Card";
import CardBody from "../../../shared/ui/card/CardBody";
import Typography from "../../../shared/ui/typography/Typography";
import Button from "../../../shared/ui/button/Button";

function IntroductionStep({ next }) {
    return (
        <Card>
            <CardBody>
                <Typography size={20} weight={700} align={'center'}>
                    Добро пожаловать на перепись населения Астаны 2023 года
                </Typography>
                <Typography size={16} weight={400} align={'center'}>
                    Ваше участие очень важно для развития нашего сообщества. Ваша информация останется конфиденциальной.
                </Typography>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button onClick={next}>Начать</Button>
                </div>
            </CardBody>
        </Card>
    );
}
export default IntroductionStep;

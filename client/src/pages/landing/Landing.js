import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Button from '../../shared/ui/button/Button';
import styles from './landing.module.css';

export default function Landing() {
    const { authHandler } = useAppContext();
    const { isAuthenticated } = authHandler;
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigate('/dashboard', { replace: true });
    //     }
    // }, [isAuthenticated, navigate]);



    return (
        <section className={styles["promoland"]}>
            <div className={styles["container"]}>
                <div className={styles["promoland__wrapper"]}>
                    <div className={styles["promoland__logo"]}>
                        <h1 className={styles["promoland__title"]}>DataVizSurvey</h1>
                    </div>
                    <h1>
                        Эффективный сбор данных и анализ для Астаны
                    </h1>
                    <h2>
                        Совершенствуйте процесс сбора демографической информации
                    </h2>
                    <div className={styles["promoland__btns"]}>
                        {isAuthenticated ? (
                            <>
                                <Button variant={'landing'} onClick={e => navigate('/survey')}>Начать опрос</Button>
                                {authHandler.user.role === 'admin' && <Button variant={'landing'} onClick={e => navigate('/admin')}>Администрирование</Button>}
                            </>
                        ) : (
                            <Button variant={'landing'} onClick={e => authHandler.authenticate()}>Войти в систему</Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

import React, {useEffect, useMemo, useState} from 'react';

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';
import BottomControl from "../../shared/ui/bottom_control/BottomControl";
import Button from "../../shared/ui/button/Button";
import Logger from "../../internal/Logger";
import Container from "../../shared/ui/box/Container";
import {useLocation, useNavigate} from "react-router-dom";
import OrderList from "../../widgets/order/order_list/OrderList";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import AppBar from "../../shared/ui/app_bar/AppBar";
import Block from "../../shared/ui/block/Block";
import Logo from "../../shared/ui/logo/Logo";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import {useAppContext} from "../../context/AppContext";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Регистрация компонентов, необходимых для графика
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ... другие импорты
import { Line } from 'react-chartjs-2';
import { LineElement, PointElement } from 'chart.js';

// Регистрация компонентов для линейного графика
ChartJS.register(LineElement, PointElement);

export default function Stats({}){

    const logger = useMemo(()=>new Logger('Stats'), [])
    const navigate = useNavigate();

    const [data, setData]=useState([]);
    useEffect(()=>{
        fetch("/api/survey")
            .then(async res => {
                const json = await res.json();
                setData(json);
            })
    }, [])

    useEffect(()=>{
        console.log(data);
    }, [data])

    const [chartData, setChartData] = useState({
        labels: [], // Метки оси X
        datasets: [
            {
                label: 'Количество',
                data: [], // Данные для графика
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        // Заполнение данных для графика на основе полученных данных
        if (data.length > 0) {
            const labels = data.map(item => item.city); // Например, города
            const surveyCount = labels.map(label => {
                return data.filter(item => item.city === label).length; // Подсчет количества для каждого города
            });

            setChartData({
                labels: labels,
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: surveyCount,
                    },
                ],
            });
        }
    }, [data]);
    const ageDistributionData = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const ageCounts = {};

        data.forEach(item => {
            const birthYear = new Date(item.dateOfBirth).getFullYear();
            const age = currentYear - birthYear;

            // Группировка по возрастам
            if (ageCounts[age]) {
                ageCounts[age] += 1;
            } else {
                ageCounts[age] = 1;
            }
        });

        const sortedAges = Object.keys(ageCounts).sort((a, b) => a - b);
        const counts = sortedAges.map(age => ageCounts[age]);

        return {
            labels: sortedAges,
            datasets: [
                {
                    label: 'Количество участников',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }
            ]
        };
    }, [data]);

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'График распределения по возрастам'
            }
        }
    };





    // Создание данных для линейного графика
    const birthRateByYearData = useMemo(() => {
        const birthYears = data.map(item => new Date(item.dateOfBirth).getFullYear());
        const countsByYear = birthYears.reduce((acc, birthYear) => {
            acc[birthYear] = (acc[birthYear] || 0) + 1;
            return acc;
        }, {});

        const sortedYears = Object.keys(countsByYear).sort();
        const birthCounts = sortedYears.map(year => countsByYear[year]);

        return {
            labels: sortedYears,
            datasets: [
                {
                    label: 'Рождаемость по годам',
                    data: birthCounts,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    tension: 0.1,
                    fill: false, // Убедитесь, что график не заливается цветом
                },
            ],
        };
    }, [data]);

// Опции для линейного графика
    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true, // Показать легенду
                position: 'top', // Расположение легенды
            },
            title: {
                display: true,
                text: 'Рождаемость по годам',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };





    return (<>
        <NavbarPanel title={'Статистика'} />
        <Box navbar={true} menu={true} yummy={true}>
            <Container>
                <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'График распределения по городам' } }}} />
                <Bar data={ageDistributionData} options={chartOptions} />
                <Line data={birthRateByYearData} options={lineChartOptions} />
            </Container>
        </Box>

        <NavigationPanel />
    </>)
}
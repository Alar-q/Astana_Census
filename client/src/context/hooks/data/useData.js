import React from 'react';
import useCitiesData from "./city/useCitiesData";

export default function useData({ socketHandler }){
    // const { cities } = useCitiesData({ socketHandler });
    const { cities } = {cities: ['', '']};
    return ({
        cities
    });
}
import React from 'react';

import styles from './typography.module.css' 

export default function Typography({children, size, weight, bottom, top, color, align}){

    // в children передаем только текст

    const fontStyle = {
        fontWeight: weight,
        fontSize: size,
        marginBottom: bottom,
        marginTop: top,
        color: color,
        textAlign: align,
    }

    return (
        <span className={styles.Typography} style={fontStyle}>
            {children}
        </span>
    );
}


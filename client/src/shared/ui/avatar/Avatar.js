import React from 'react';

import styles from './avatar.module.css'

import ProfileDefaultImg from '../../../assets/images/profile.jpg';
export default function Avatar({imgSrc='', right, left, top, bottom}){

    const style = {
        marginTop: top,
        marginBottom:bottom,
        marginRight: right,
        marginLeft: left,
    }

    return (
        <div
            className={`
                ${styles.Avatar} 
            `}
            style={style}
        >
            <img className={styles['Avatar__img']}
                 src={imgSrc ? imgSrc : ProfileDefaultImg}
            />
        </div>
    );
}


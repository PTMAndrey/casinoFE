import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { RiEdit2Fill } from 'react-icons/ri';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useStateProvider from '../../hooks/useStateProvider';

import styles from './CardPersonal.module.scss';

const CardPersonal = ({ url, text, imagine }) => {
    const [openPopup, setOpenPopup] = useState(false);

    const { setIDJocCurent } = useStateProvider();
    const navigate = useNavigate();
    function stopPropagation(e) {
        e.stopPropagation();
    }

    //popup
    const togglePopup = (props) => {
        setOpenPopup(!openPopup);
    };
    return (
        <>
            <Card className={styles.personalContainer} onClick={() => { navigate("/" + url); }} >
                <div className={styles.imgContainer}>
                    <Card.Img className={`${styles.imagesDiv} ${styles.imagine}`} variant="top" src={`${imagine}`} />
                </div>
                <Card.Body>
                    <Card.Title className={styles.alignCenter} >{text}</Card.Title>
                </Card.Body>

            </Card>
        </>
    )
}

export default CardPersonal;
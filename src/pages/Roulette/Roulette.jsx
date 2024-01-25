import React, { useEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import useAuth from '../../hooks/useAuth';
import useStateProvider from '../../hooks/useStateProvider';

import { useLocation } from "react-router-dom";
import Input from '../../components/Input/Input';
import { placeBet } from '../../api/API';
import styles from './Roulette.module.scss';

const data = [
    { option: '0', style: { backgroundColor: 'GREEN', textColor: 'BLACK' } },
    { option: '11', style: { backgroundColor: 'BLACK', textColor: 'white' } },
    { option: '5', style: { backgroundColor: 'RED', textColor: 'BLACK' } },
    { option: '10', style: { backgroundColor: 'BLACK', textColor: 'white' } },
    { option: '6', style: { backgroundColor: 'RED', textColor: 'BLACK' } },
    { option: '9', style: { backgroundColor: 'BLACK', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'RED', textColor: 'BLACK' } },
    { option: '8', style: { backgroundColor: 'BLACK', textColor: 'white' } },
    { option: '1', style: { backgroundColor: 'RED', textColor: 'BLACK' } },
    { option: '14', style: { backgroundColor: 'BLACK', textColor: 'white' } },
    { option: '2', style: { backgroundColor: 'RED', textColor: 'BLACK' } },
    { option: '13', style: { backgroundColor: 'BLACK', textColor: 'white' } },
    { option: '3', style: { backgroundColor: 'RED', textColor: 'BLACK' } },
    { option: '12', style: { backgroundColor: 'BLACK', textColor: 'white' } },
    { option: '4', style: { backgroundColor: 'RED', textColor: 'BLACK' } },
]

const Roulette = () => {
    const { userID, user, fetchUser } = useAuth();
    const { jocuri, fetchJocuri, setAlert } = useStateProvider();

    const [idJocCurent, setIDJocCurent] = useState("");
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [spinDuration, setSpinDuration] = useState(0.5);
    const [doRequest, setDoRequest] = useState(false);

    const [butonState, setButonState] = useState(user?.balanta === null ? true : false);

    const location = useLocation().pathname;

    useEffect(() => {
        if (location === "/ruleta" && jocuri) {
            setIDJocCurent(jocuri[0]?.idJoc);
        }
    }, [jocuri]);

    const [formValue, setFormValue] = useState({
        sumaPariata: '',
        rezultatPariu: "",
        idUtilizator: userID,
        idJoc: "",
    });
    useEffect(() => {
        setFormValue(fv => ({
            ...fv,
            idJoc: idJocCurent
        }));
    }, [idJocCurent]);

    // useEffect(() => {
    //     if (location === "/ruleta") {
    //         fetchJocuri();
    //         jocuri.map(joc => (
    //             joc.numeJoc === 'Ruleta' ? (setIDJocCurent(joc.idJoc),
    //             setFormValue({
    //                 ...formValue,
    //                 idJoc: idJocCurent
    //             })):null
    //         ));
    //     }
    // }, [idJocCurent])


    const handlePlaceBet = async () => {
        try {
            const response = await placeBet(formValue);
            if (response) {
                setFormValue({ ...formValue, sumaPariata: '', rezultatPariu: '' });
                fetchUser();
            }
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Something went wrong',
            });
            console.log(error);
        }
    }

    const handleSpinClick = (betColor) => {
        if (user.balanta === 0) {
            setAlert({
                type: 'danger',
                message: 'Fonduri insuficiente!',
            });
        }
        else
            if (formValue.sumaPariata > user?.balanta) {
                setAlert({
                    type: 'danger',
                    message: 'Pariul depaseste soldul curent',
                });
                setFormValue({ ...formValue, sumaPariata: '', rezultatPariu: '' });
            }
            else
                if (formValue.sumaPariata === 0 || formValue.sumaPariata === '') {
                    setAlert({
                        type: 'danger',
                        message: 'Pariu minim 1',
                    });
                }
                else if (formValue.sumaPariata > 0) {
                    if (!mustSpin) {
                        const newPrizeNumber = Math.floor(Math.random() * data.length);
                        setPrizeNumber(newPrizeNumber);
                        setMustSpin(true);
                        if (data[newPrizeNumber].style.backgroundColor === betColor) {

                            if (betColor !== "GREEN") {
                                setTimeout(() => {
                                    setAlert({
                                        type: 'success',
                                        message: `Ati câștigat ${formValue.sumaPariata * 2}`,
                                    });
                                }, 5200);
                            }
                            else {
                                setTimeout(() => {
                                    setAlert({
                                        type: 'success',
                                        message: `Ati câștigat ${formValue.sumaPariata * 14}`,
                                    });
                                }, 5200);
                            }
                            setTimeout(() => {
                                setDoRequest(!doRequest);
                                setFormValue({ ...formValue, rezultatPariu: "WIN_" + betColor })
                            }, 5200);
                        }
                        else {
                            setTimeout(() => {
                                setDoRequest(!doRequest);
                                setFormValue({ ...formValue, rezultatPariu: "LOOSE_" + betColor })
                                setAlert({
                                    type: 'danger',
                                    message: `Pariu necâștigător :(`,
                                });
                            }, 5200);
                        }
                    }
                }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value !== '0')
            setFormValue((prev) => {
                return { ...prev, [name]: value };
            });
    };


    useEffect(() => {
        if (formValue.rezultatPariu !== '') {
            handlePlaceBet();
            fetchUser();
        }
    }, [doRequest])

    return (
        <div className={styles.containerRuleta}>
            <div className={styles.titlu}>
                <h2>Ruleta FIESC</h2>
            </div>
            <div className={styles.ruleta}>
                <p>Balanță: {user?.balanta === null || user?.balanta === 0 ? 0 : user?.balanta} </p>
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    startingOptionIndex={0}
                    spinDuration={spinDuration}
                    onStopSpinning={() => {
                        setMustSpin(false);
                    }}
                />
                <Input
                    type='number'
                    name='sumaPariata'
                    id='sumaPariata'
                    value={formValue.sumaPariata}
                    label='Introduceti pariu'
                    placeholder='Bani'
                    min="1"
                    onChange={handleChange}
                // error={showErrors && checkErrors('scorCSM') ? true : false}
                // helper={showErrors ? checkErrors('scorCSM') : ''}
                />
                <div className={styles.butoanePariu}>

                    <button disabled={butonState} className={styles.buttonRED} onClick={() => handleSpinClick('RED')}>ROSU</button>
                    <button disabled={butonState} className={styles.buttonBLACK} onClick={() => handleSpinClick('BLACK')}>NEGRU</button>
                    <button disabled={butonState} className={styles.buttonGREEN} onClick={() => handleSpinClick('GREEN')}>VERDE</button>
                </div>
            </div>
        </div>
    )
}

export default Roulette
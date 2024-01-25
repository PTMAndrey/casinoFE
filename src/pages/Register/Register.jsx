import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Buton/Button";

import { ReactComponent as View } from "../../assets/icons/view.svg";
import { ReactComponent as ViewOff } from "../../assets/icons/view-off.svg";

import useAuth from "../../hooks/useAuth";
import useStateProvider from "../../hooks/useStateProvider";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import { register } from "../../api/API";

const RegisterForm = () => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const { setAlert } = useStateProvider();
    const [passwordShown, setPasswordShown] = useState(true);
    const [formValue, setFormValue] = useState({
        nume: "",
        prenume: "",
        email: "",
        parola: "",
        cnp: "",
        adresa: "",
        alias: "",
        balanta: 0,
        idCodulMeuReferal: null,
        codulMeuReferal: "",
    });

    // show errors only if clicked to submit
    const [showErrors, setShowErrors] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => {
            return { ...prev, [name]: value };
        });
    };
    const passToggleHandler = () => {
        setPasswordShown(!passwordShown);
    };

    const checkErrors = (field) => {
        // nume
        if (field === "nume") {
            if (formValue.nume.length < 3 && formValue.nume.length > 0) {
                return "Numele trebuie sa aiba cel putin 3 caractere!";
            } else if (formValue.nume.length > 50) {
                return "Numele trebuie sa fie de cel mult 50 de caractere!";
            } else if (formValue.nume.length === 0) {
                return "Numele este obligatoriu!";
            }
        }
        //prenume
        if (field === "prenume") {
            if (formValue.prenume.length < 3 && formValue.prenume.length > 0) {
                return "Prenumele trebuie sa aiba cel putin 3 caractere!";
            } else if (formValue.prenume.length > 50) {
                return "Prenumele trebuie sa fie de cel mult 50 de caractere!";
            } else if (formValue.prenume.length === 0) {
                return "Prenumele este obligatoriu!";
            }
        }

        // cnp
        if (field === "cnp") {
            if (formValue.cnp.length !== 13) {
                return "CNP-ul trebuie sa aiba exact 13 cifre!";
            } else if (formValue.cnp.length === 0) {
                return "CNP-ul este obligatoriu!";
            }
        }

        // adresa
        if (field === "adresa") {
            if (formValue.adresa.length < 10 && formValue.adresa.length > 0) {
                return "Adresa trebuie sa aiba cel putin 10 caractere!";
            } else if (formValue.adresa.length > 50) {
                return "Adresa trebuie sa fie de cel mult 50 de caractere!";
            } else if (formValue.adresa.length === 0) {
                return "Adresa este obligatorie!";
            }
        }

        // alias
        if (field === "alias") {
            if (formValue.alias.length < 3 && formValue.alias.length > 0) {
                return "Alias-ul trebuie sa aiba cel putin 3 caractere!";
            } else if (formValue.alias.length > 50) {
                return "Alias-ul trebuie sa fie de cel mult 50 de caractere!";
            } else if (formValue.adresa.length === 0) {
                return "Alias-ul este obligatoriu!";
            }
        }
        
        // codulMeuReferal
        if (field === "codulMeuReferal") {
            if (formValue.alias.length < 3 && formValue.alias.length > 0) {
                return "Codul trebuie sa aiba cel putin 3 caractere!";
            } else if (formValue.adresa.length === 0) {
                return "Codul este obligatoriu!";
            }
        }

        //email
        if (field === "email") {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (formValue.email.length === 0)
                return "Adresa de email este obligatorie!";
            else if (reg.test(formValue.email) === false)
                return "Adresa de email este invalida!";
        }

        if (field === "parola") {
            if (formValue.parola.length < 7)
                return "Parola trebuie sa fie de cel putin 7 caractere!";
        }

        return "";
    };

    // check if form is valid
    const isFormValid = () => {
        let isValid = true;
        Object.keys(formValue).forEach((field) => {
            if (checkErrors(field)) {
                isValid = false;
            }
        });
        return isValid;
    };

    // handle register
    const handleRegister = async () => {
        if (!isFormValid()) {
            setShowErrors(true);
        }
        if (isFormValid()) {
            setShowErrors(false);
            try {
                const response = await register(formValue);
                if (response.status === 200) {
                    navigate("/login");
                    setAlert({
                        type: "success",
                        message: "Contul a fost creat cu succes!",
                    });
                }
            } catch (error) {
                console.log(error, "error");
                setAlert({
                    type: "danger",
                    message: "Ceva nu a mers bine...",
                });
            }
        }
    };

    const handleAutoFill = async () => {
        const fill = {
            nume: "Cont",
            prenume: "Nou",
            cnp: "1034567890999",
            adresa: "Str. Exemplu 25, Timisoara",
            email: "cont.nou@example.com",
            parola: "parola123",
            alias: "cont_nou",
            dataInregistrare: "01-01-2024",
            balanta: 100,
            numarReferiti: 0,
            codulMeuReferal: "referal9999",
            idCodulMeuReferal: null,
        };
        const response = await register(fill);
        if (response.status === 200) {
            navigate("/login");
            setAlert({
                type: "success",
                message: "Contul a fost creat cu succes!",
            });

        };
    }

    return (

        <div className={styles.auth}>
            <div className={styles.layer}>
                <div className={styles.containerAuth}>
                    <div className={styles.contentContainerForm}>
                        <div className={styles.form}>
                            <h4 className={styles.title}>Creeaza cont</h4>
                            <div className={styles.formInput}>
                                <Button
                                    variant="secondary"
                                    // icon={<Google />}
                                    position="left"
                                    label={width > 500 ? "Formular completat" : "Completeaza"}
                                    onClick={handleAutoFill}
                                />
                                <div className={styles.registerSeparator}>
                                    <hr />
                                    <span> SAU </span>
                                    <hr />
                                </div>

                                <Input
                                    type="text"
                                    placeholder={"Nume"}
                                    required
                                    label="Nume *"
                                    id="nume"
                                    name="nume"
                                    value={formValue.nume}
                                    onChange={handleChange}
                                    error={showErrors && checkErrors("nume") ? true : false}
                                    helper={showErrors ? checkErrors("nume") : ""}
                                />

                                <Input
                                    type="text"
                                    placeholder={"Prenume"}
                                    required
                                    label="Prenume *"
                                    id="prenume"
                                    name="prenume"
                                    value={formValue.prenume}
                                    onChange={handleChange}
                                    error={showErrors && checkErrors("prenume") ? true : false}
                                    helper={showErrors ? checkErrors("prenume") : ""}
                                />

                                <Input
                                    type="text"
                                    placeholder={"CNP"}
                                    required
                                    label="CNP *"
                                    id="cnp"
                                    name="cnp"
                                    value={formValue.cnp}
                                    onChange={handleChange}
                                    error={showErrors && checkErrors("cnp") ? true : false}
                                    helper={showErrors ? checkErrors("cnp") : ""}
                                />

                                <Input
                                    type="text"
                                    placeholder={"Adresa"}
                                    required
                                    label="Adresa *"
                                    id="adresa"
                                    name="adresa"
                                    value={formValue.adresa}
                                    onChange={handleChange}
                                    error={showErrors && checkErrors("adresa") ? true : false}
                                    helper={showErrors ? checkErrors("adresa") : ""}
                                />

                                <Input
                                    type="email"
                                    placeholder={"Email"}
                                    required
                                    label="Email *"
                                    id="email"
                                    name="email"
                                    value={formValue.email}
                                    onChange={handleChange}
                                    error={showErrors && checkErrors("email") ? true : false}
                                    helper={showErrors ? checkErrors("email") : ""}
                                />

                                <Input
                                    type={passwordShown ? "password" : "text"}
                                    placeholder={"Parola"}
                                    required
                                    label="Parola *"
                                    id="parola"
                                    name="parola"
                                    value={formValue.parola}
                                    onChange={handleChange}
                                    error={showErrors && checkErrors("parola") ? true : false}
                                    helper={showErrors ? checkErrors("parola") : ""}
                                    icon={passwordShown ? <View /> : <ViewOff />}
                                    onIconClick={passToggleHandler}
                                />
                                <span className={styles.textInfo}>Cel putin 7 caractere.</span>

                                <Input
                                    type="text"
                                    placeholder={"Alias"}
                                    required
                                    label="Alias *"
                                    id="alias"
                                    name="alias"
                                    value={formValue.alias}
                                    onChange={handleChange}
                                    error={showErrors && checkErrors("alias") ? true : false}
                                    helper={showErrors ? checkErrors("alias") : ""}
                                />

                                <Input
                                    type="text"
                                    placeholder={"Cod"}
                                    required
                                    label="Creeaza codul propriu referal *"
                                    id="codulMeuReferal"
                                    name="codulMeuReferal"
                                    value={formValue.codulMeuReferal}
                                    onChange={handleChange}
                                    error={showErrors && checkErrors("codulMeuReferal") ? true : false}
                                    helper={showErrors ? checkErrors("codulMeuReferal") : ""}
                                />
                                <Input
                                    type="text"
                                    placeholder={"Introdu codul referal"}
                                    required
                                    label="Ai un cod referal?"
                                    id="idCodulMeuReferal"
                                    name="idCodulMeuReferal"
                                    value={formValue.idCodulMeuReferal}
                                    onChange={handleChange}
                                    error={showErrors && checkErrors("idCodulMeuReferal") ? true : false}
                                    helper={showErrors ? checkErrors("idCodulMeuReferal") : ""}
                                />
                                <span className={styles.textInfo}>Optional</span>

                            </div>
                            <span className={styles.textRedInfo}>* câmpuri obligatorii</span>
                        </div>
                    </div>

                    <div className={styles.contentContainerAuthOptions}>
                        <div className={`${styles.contentContainerButtons} ${styles.register}`}>
                            <Button
                                id="register"
                                variant="primary"
                                label="Inregistrare"
                                onClick={handleRegister}
                            />
                        </div>
                        <div className={`${styles.contentContainerAuthEndForm} ${styles.authRegister}`}>
                            <div className={styles.textAuthEndForm}>
                                Dețineți un cont?{" "}
                                <span
                                    className={styles.textAuthEndForm}
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    Conectare
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;

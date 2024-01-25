import React, { useState } from "react";
import RowItem from "../RowItem/RowItem";
import styles from "./Referal.module.scss";

import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Buton/Button";
import useStateProvider from "../../../hooks/useStateProvider";
import { actualizeazaCodulMeuReferal, addCodReferal } from "../../../api/API";


const Referal = () => {
    // global states
    const { user, fetchUser } = useAuth();
    const { setAlert } = useStateProvider();

    const [activeForm, setActiveForm] = useState("");

    const [formValue, setFormValue] = useState({
        id: user?.idUtilizator,
        codReferal: "",
    });


    // isFormValid
    const checkErrors = (field) => {
        if (field === "codReferal") {
            if (formValue?.codReferal === "") {
                return "Introduceti cod!";
            }
            else if (formValue?.codReferal === null) {
                return "Introduceti cod!";
            }
        }

        return "";
    };

    const isFormValid = () => {
        let isValid = true;
        Object.keys(formValue).forEach((field) => {
            if (checkErrors(field)) {
                isValid = false;
            }
        });
        return isValid;
    };


    // show error message
    const [showErrors, setShowErrors] = useState(false);

    // handleSubmit
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isFormValid()) {
            setShowErrors(true);
            setAlert({ type: "danger", message: "Câmpurile trebuie completate!" });
        }
        // check if form is valid
        if (isFormValid()) {
            // set error state
            setShowErrors(false);
            try {
                const response = await actualizeazaCodulMeuReferal(formValue);
                if (response.status === 200) {
                    setAlert({
                        type: "success",
                        message: "Codul a fost modificat cu succes!",
                    });
                    fetchUser();
                    setActiveForm("");
                    setFormValue({
                        id: user?.idUtilizator,
                        codReferal: ""
                    });
                }
            } catch (error) {
                console.log(error, "error");
                setAlert({
                    type: "danger",
                    message: "Codul introdus nu exista!",
                });
            }
        } else {
            setShowErrors(true);
        }
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isFormValid()) {
            setShowErrors(true);
            setAlert({ type: "danger", message: "Câmpurile trebuie completate!" });
        }
        // check if form is valid
        if (isFormValid()) {
            // set error state
            setShowErrors(false);
            try {
                const response = await addCodReferal(formValue);
                if (response.status === 200) {
                    setAlert({
                        type: "success",
                        message: "Codul a fost adaugat cu succes!",
                    });
                    fetchUser();
                    setActiveForm("");
                    setFormValue({
                        id: user?.idUtilizator,
                        codReferal: ""
                    });
                }
            } catch (error) {
                console.log(error, "error");
                setAlert({
                    type: "danger",
                    message: "Codul introdus nu exista!",
                });
            }
        } else {
            setShowErrors(true);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => {
            return { ...prev, [name]: value };
        });
    };


    // handleCancel
    const handleCancel = () => {
        setActiveForm("");

        // form inital value
        setFormValue({
            id: user?.idUtilizator,
            codReferal: ""
        });

    };
    return (
        <div>
            <h4 className={styles.title}>Salut {user.alias}</h4>
            {user?.referiti ?
                <RowItem
                    title="Codul meu referal"
                    info={user?.codulMeuReferal}
                />
                :

                <>
                    <RowItem
                        title="Codul meu referal"
                        info={user?.codulMeuReferal}
                        action="Schimba codul"
                        active={activeForm === "codReferal1" ? true : false}
                        disabled={activeForm === "codReferal2" ? true : false}
                        onCancel={handleCancel}
                        onAction={() => {
                            setActiveForm("codReferal1");
                        }}
                    />

                    {activeForm === "codReferal1" && (
                        <div className={styles.form}>
                            {/* firstName */}
                            <Input
                                type="text"
                                name="codReferal"
                                placeholder="Cod"
                                id="codReferal"
                                label="Introdu cod"
                                value={formValue.codReferal}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                error={showErrors && checkErrors("codReferal") ? true : false}
                                helper={showErrors ? checkErrors("codReferal") : ""}
                            />

                            <Button onClick={(e) => handleSubmit1(e)} label="Save" />
                        </div>
                    )}
                </>
            }

            {(user?.idCodulMeuReferal) ?
                <RowItem
                    title="Ai folosit codul referal"
                    info={user?.idCodulMeuReferal}
                />
                :
                <>
                    <RowItem
                        title="Activeaza un cod referal pentru beneficii"
                        // info={user?.codReferal}
                        action="Introdu cod"
                        active={activeForm === "codReferal2" ? true : false}
                        disabled={activeForm === "codReferal1" ? true : false}
                        onCancel={handleCancel}
                        onAction={() => {
                            setActiveForm("codReferal2");
                        }}
                    />
                    {activeForm === "codReferal2" && (
                        <div className={styles.form}>
                            {/* firstName */}
                            <Input
                                type="text"
                                name="codReferal"
                                placeholder="Cod"
                                id="codReferal"
                                label="Introdu cod"
                                value={formValue.codReferal && formValue.codReferal}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                error={showErrors && checkErrors("codReferal") ? true : false}
                                helper={showErrors ? checkErrors("codReferal") : ""}
                            />

                            <Button onClick={(e) => handleSubmit2(e)} label="Save" />
                        </div>
                    )}
                </>
            }
            {user?.referiti &&
                <RowItem
                    title="Codul tau a fost folosit de"
                    info={null}
                    data={user.referiti}
                />
            }
        </div>
    );
};

export default Referal;

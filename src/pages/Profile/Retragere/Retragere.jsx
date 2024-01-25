import React, { useState } from "react";
import RowItem from "../RowItem/RowItem";
import styles from "./Retragere.module.scss";

import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Buton/Button";
import useStateProvider from "../../../hooks/useStateProvider";
import { addCodReferal, retragereBani } from "../../../api/API";


const Retragere = () => {
    // global states
    const { user, fetchUser } = useAuth();
    const { setAlert } = useStateProvider();

    const [activeForm, setActiveForm] = useState("");

    const [formValue, setFormValue] = useState({
        idUtilizator: user?.idUtilizator,
        sumaRetrasa: "",
    });


    // isFormValid
    const checkErrors = (field) => {
        if (field === "sumaRetrasa") {
            if (formValue?.sumaRetrasa === "") {
                return "Introduceti valoare!";
            }
            else if (formValue?.sumaRetrasa === null) {
                return "Introduceti valoare!";
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(formValue);
        if (!isFormValid()) {
            setShowErrors(true);
            setAlert({ type: "danger", message: "Câmpurile trebuie completate!" });
        }
        // check if form is valid
        if (isFormValid()) {
            // set error state
            setShowErrors(false);
            try {
                const response = await retragereBani(formValue);
                if (response.status === 200) {
                    setAlert({
                        type: "success",
                        message: "Suma a fost retrasa cu succes!",
                    });
                    fetchUser();
                    setActiveForm("");
                }
            } catch (error) {
                console.log(error, "error");
                setAlert({
                    type: "danger",
                    message: "Eroare!",
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
            sumaDepusa: user?.idCodulMeuReferal
        });

    };
    return (
        <div>
            <h4 className={styles.title}>Salut {user.alias}</h4>

            <RowItem
                title="Retrage bani"
                info={user?.codReferal}
                action="Adaugă"
                active={activeForm === "retrage" ? true : false}
                onCancel={handleCancel}
                onAction={() => {
                    setActiveForm("retrage");
                }}
            />

            {activeForm === "retrage" && (
                <div className={styles.form}>
                    {/* firstName */}
                    <Input
                        type="number"
                        name="sumaRetrasa"
                        placeholder="Suma"
                        id="sumaRetrasa"
                        label="Introdu suma"
                        value={formValue.codReferal}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        error={showErrors && checkErrors("sumaRetrasa") ? true : false}
                        helper={showErrors ? checkErrors("sumaRetrasa") : ""}
                    />

                    <Button onClick={(e) => handleSubmit(e)} label="Save" />
                </div>
            )}

            <RowItem
                title="Istoric retragere"
            />
            {user?.retrageri &&
                <>
                    {user?.retrageri.map(dep => (
                        <p>{dep.sumaRetrasa} lei ............ {dep.dataRetragere}</p>
                    ))}
                </>
            }
        </div>
    );
};

export default Retragere;

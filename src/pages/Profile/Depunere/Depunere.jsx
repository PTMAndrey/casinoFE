import React, { useState } from "react";
import RowItem from "../RowItem/RowItem";
import styles from "./Depunere.module.scss";

import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Buton/Button";
import useStateProvider from "../../../hooks/useStateProvider";
import { addCodReferal, depunereBani } from "../../../api/API";


const Depunere = () => {
    // global states
    const { user, fetchUser } = useAuth();
    const { setAlert } = useStateProvider();

    const [activeForm, setActiveForm] = useState("");

    const [formValue, setFormValue] = useState({
        idUtilizator: user?.idUtilizator,
        sumaDepusa: "",
    });


    // isFormValid
    const checkErrors = (field) => {
        if (field === "sumaDepusa") {
            if (formValue?.sumaDepusa === "") {
                return "Introduceti valoare!";
            }
            else if (formValue?.sumaDepusa === null) {
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

        if (!isFormValid()) {
            setShowErrors(true);
            setAlert({ type: "danger", message: "Câmpurile trebuie completate!" });
        }
        // check if form is valid
        if (isFormValid()) {
            // set error state
            setShowErrors(false);
            try {
                const response = await depunereBani(formValue);
                if (response.status === 200) {
                    setAlert({
                        type: "success",
                        message: "Suma a fost depusa cu succes!",
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
                title="Depune bani"
                info={user?.codReferal}
                action="Adaugă"
                active={activeForm === "depune" ? true : false}
                onCancel={handleCancel}
                onAction={() => {
                    setActiveForm("depune");
                }}
            />

            {activeForm === "depune" && (
                <div className={styles.form}>
                    {/* firstName */}
                    <Input
                        type="number"
                        name="sumaDepusa"
                        placeholder="Suma"
                        id="sumaDepusa"
                        label="Introdu suma"
                        value={formValue.codReferal}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        error={showErrors && checkErrors("sumaDepusa") ? true : false}
                        helper={showErrors ? checkErrors("sumaDepusa") : ""}
                    />

                    <Button onClick={(e) => handleSubmit(e)} label="Save" />
                </div>
            )}
            <RowItem
                title="Istoric depunere"
            />
            {user?.depuneri &&
                <>
                    {user?.depuneri.map(dep =>(
                        <p>{dep.sumaDepusa} lei ............ {dep.dataDepunere}</p>
                    ))}
                </>
            }
        </div>
    );
};

export default Depunere;

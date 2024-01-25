import React from "react";
import RowItem from "../RowItem/RowItem";
import styles from "./Profil.module.scss";

import useAuth from "../../../hooks/useAuth";


const Profil = () => {
  // global states
  const { user } = useAuth();

  return (
    <div>
      <h4 className={styles.title}>Salut {user?.alias}</h4>
     
      <RowItem
        title="Utilizator"
        info={ user?.nume + " " + user?.prenume}
      />
      
      <RowItem
        title="Balanță"
        info={user?.balanta +' lei'}
      />

      <RowItem
        title="Adresa de email"
        info={user?.email}
      />

      <RowItem
        title="Adresa"
        info={user?.adresa}
      />

    </div>
  );
};

export default Profil;

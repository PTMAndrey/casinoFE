import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// icons
import { ReactComponent as ProfileIcon } from "../../assets/icons/person.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { IoLibraryOutline } from "react-icons/io5";
// tabs
import Profil from "./Profil/Profil";
// styles
import styles from "./ProfilulMeu.module.scss";

// useauth
import useAuth from "../../hooks/useAuth";
import useStateProvider from "../../hooks/useStateProvider";
import { GiThreeFriends } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";


import Referal from "./Referal/Referal";
import Depunere from "./Depunere/Depunere";
import Retragere from "./Retragere/Retragere";
// import { updateUser } from "../../api/API";

const ProfilulMeu = () => {
  const { setAlert } = useStateProvider();
  const { user, logout, fetchUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = location.pathname.split("/")[2];
  const tabSelector = () => {
    switch (currentTab) {
      case "profil":
        return <Profil />;
      case "referal":
        return < Referal />;
      case "depunere":
        return < Depunere />;
      case "retragere":
        return < Retragere />;
      default:
        break;
    }
  };

  // handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setAlert({
      type: "success",
      message: "Acces in website ca vizitator",
    });
  };

  return user ? (
    <section className={styles.container}>
      {/* navigation section */}

      <nav className={`${styles.navigation}`}>
        <button
          className={currentTab === "profil" ? styles.active : ""}
          onClick={() => navigate("/user/profil")}
        >
          <ProfileIcon />
          <span>Profil</span>
        </button>
        <button
          className={currentTab === "referal" ? styles.active : ""}
          onClick={() => navigate("/user/referal")}
        >
          <GiThreeFriends size={'25px'} fill={'black'} />
          <span>Referal</span>
        </button>
        <button
          className={currentTab === "depunere" ? styles.active : ""}
          onClick={() => navigate("/user/depunere")}
        >
          <GiPayMoney size={'25px'} fill={'black'} />
          <span>Depunere</span>
        </button>
        <button
          className={currentTab === "retragere" ? styles.active : ""}
          onClick={() => navigate("/user/retragere")}
        >
          <GiReceiveMoney size={'25px'} fill={'black'} />
          <span>Retragere</span>
        </button>
        {/* <button
          className={currentTab === "abonament" ? styles.active : ""}
          onClick={() => navigate("/user/abonament")}
        >
         <BellIcon size={'25px'} stroke={user?.abonamentExpirat === false ? 'black' : 'orange'} /> 
          <span>Abonament</span>
        </button> */}
        <button onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </button>
      </nav>
      {/* main section */}
      <div className={styles.content}>{tabSelector()}</div>
    </section>
  ) : (
    <div>Loading...</div>
  );
};

export default ProfilulMeu;

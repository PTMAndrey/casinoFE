import React, { useEffect, useState } from 'react'
import styles from './Home.module.scss';
import { Container } from 'react-bootstrap';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useAuth from '../../hooks/useAuth';
import CardPersonal from '../../components/Card/CardPersonal';
import useStateProvider from '../../hooks/useStateProvider';

const Home = () => {
  const { width } = useWindowDimensions();
  const { user } = useAuth();
  const { jocuri } = useStateProvider();

  const Ruleta = `${require('../../assets/imagini/ruleta (1).svg').default}`;
 
  return (
    <Container fluid className={styles.mainContainer}>
      <div className={styles.titlu}>
        <h2>WELCOME TO FIESC CASINO</h2>
      </div>

      {jocuri.map(joc => (
        <CardPersonal key={joc.idJoc} url="ruleta" text={joc.numeJoc} imagine={Ruleta} id={joc.idJoc}/>
      )
      )}
    </Container >
  )
}

export default Home
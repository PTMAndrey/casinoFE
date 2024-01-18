import React, { useState } from 'react'
import styles from './Home.module.scss';
import { Container } from 'react-bootstrap';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useAuth from '../../hooks/useAuth';
import Roulette from '../Roulette/Roulette';

const Home = () => {
  const { width } = useWindowDimensions();
  const { user } = useAuth();

  return (
    <Container fluid className={styles.mainContainer}>
      <Roulette/>
    </Container >
  )
}

export default Home
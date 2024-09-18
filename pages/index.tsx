import React from 'react';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to My Aggregator App</h1>
    </div>
  );
};

export default Home;

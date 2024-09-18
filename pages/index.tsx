import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const [kycStatus, setKycStatus] = useState('Not Completed');
  const [advancedMode, setAdvancedMode] = useState(false);

  const handleKyc = () => {
    setKycStatus('In Progress');
    // Simulate KYC process
    setTimeout(() => {
      setKycStatus('Completed');
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    // Add form submission logic here
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Intent-Based Aggregator DApp</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2>User Information</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className={styles.section}>
          <h2>Select Your Intent</h2>
          <label htmlFor="intent">Intent:</label>
          <select id="intent" name="intent" required>
            <option value="">--Select--</option>
            <option value="investment">Investment</option>
            <option value="savings">Savings</option>
            <option value="retirement">Retirement</option>
          </select>
        </div>

        <div className={styles.section}>
          <h2>KYC Status</h2>
          <p>Status: {kycStatus}</p>
          <button type="button" onClick={handleKyc} className={styles.submitButton}>
            Sign Up / KYC
          </button>
        </div>

        <div className={styles.section}>
          <label>
            <input
              type="checkbox"
              checked={advancedMode}
              onChange={() => setAdvancedMode(!advancedMode)}
            />
            Enable Advanced Mode
          </label>

          {advancedMode && (
            <div className={styles.advancedOptions}>
              <h3>Advanced Options</h3>
              <label htmlFor="kycPartner">KYC Partner:</label>
              <select id="kycPartner" name="kycPartner">
                <option value="">--Select--</option>
                <option value="jumio">Jumio</option>
                <option value="onfido">Onfido</option>
              </select>

              <label htmlFor="bankingPartner">Banking Partner:</label>
              <select id="bankingPartner" name="bankingPartner">
                <option value="">--Select--</option>
                <option value="bankA">Bank A</option>
                <option value="bankB">Bank B</option>
              </select>
            </div>
          )}
        </div>

        <button type="submit" className={styles.submitButton} disabled={kycStatus !== 'Completed'}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

// Consolidated list of countries (2 per continent)
const countryList = [
  "United States", "Canada",          // North America
  "Brazil", "Argentina",              // South America
  "Germany", "United Kingdom",        // Europe
  "South Africa", "Nigeria",          // Africa
  "India", "Japan",                   // Asia
  "Australia", "New Zealand"          // Oceania
];

const Home: React.FC = () => {
  const [name, setName] = useState(''); // User's name
  const [country, setCountry] = useState(''); // User's country
  const [rampOption, setRampOption] = useState(''); // Onramp or Offramp selection
  const [fiatCurrency, setFiatCurrency] = useState(''); // Selected fiat currency
  const [cryptoCurrency, setCryptoCurrency] = useState(''); // Selected cryptocurrency
  const [amount, setAmount] = useState(''); // Amount to onramp/offramp
  const [paymentMethod, setPaymentMethod] = useState(''); // Selected payment method
  const [serviceRecommendation, setServiceRecommendation] = useState(''); // Recommended service

  // Handle name input change (up to 25 characters)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    const alphabetRegex = /^[A-Za-z\s]*$/; // Allow letters and spaces
    if (alphabetRegex.test(inputName) && inputName.length <= 25) {
      setName(inputName);
    }
  };

  // Handle amount input change (up to 100,000,000)
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = e.target.value;
    if (Number(inputAmount) <= 100000000) {
      setAmount(inputAmount);
    }
  };

  // Determine payment methods based on Onramp/Offramp selection
  const getPaymentMethods = () => {
    if (rampOption === 'Onramp') {
      return ['Bank Transfer', 'Credit Card', 'Google Pay', 'UPI'];
    } else if (rampOption === 'Offramp') {
      return ['ACH', 'WIRE', 'SWIFT', 'SEPA', 'CASH', 'IMPS'];
    }
    return [];
  };

  // Generate a service recommendation based on user's input
  const getServiceRecommendation = () => {
    const services = [
      { name: 'CryptoFlow', description: 'Partnered with StellarBank, used by over 10,000 users.' },
      { name: 'PayZenith', description: 'Partnered with QuantumBank, trusted by 5,000 users.' },
      { name: 'TransactX', description: 'Partnered with NovaBank, preferred by 8,500 users.' },
    ];
    const randomService = services[Math.floor(Math.random() * services.length)];
    setServiceRecommendation(`${randomService.name} - ${randomService.description}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Intent Based Payments</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <h1 className={styles.title}>Intent Based Payments</h1>

      <div className={styles.conversation}>
        {/* Name Input */}
        {!name ? (
          <p>
            Hi, my name is{' '}
            <input
              type="text"
              value={name}
              onChange={handleNameChange} // Capture full name with 25 character limit
              placeholder="Enter your name"
              className={styles.inputInline}
            />
            .
          </p>
        ) : (
          <>
            {/* Country Selection */}
            {!country ? (
              <p>
                Hi <strong>{name}</strong>, I'm from{' '}
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={styles.selectInline}
                >
                  <option value="">Select Country</option>
                  {countryList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                .
              </p>
            ) : (
              <>
                {/* Onramp/Offramp Selection */}
                {!rampOption ? (
                  <p>
                    Hi <strong>{name}</strong> from <strong>{country}</strong>, I want to{' '}
                    <button onClick={() => setRampOption('Onramp')} className={styles.optionButton}>
                      Onramp
                    </button>{' '}
                    /{' '}
                    <button onClick={() => setRampOption('Offramp')} className={styles.optionButton}>
                      Offramp
                    </button>
                    .
                  </p>
                ) : (
                  <>
                    {/* Amount Input */}
                    {!amount ? (
                      <p>
                        I want to {rampOption.toLowerCase()} {' '}
                        <input
                          type="number"
                          value={amount}
                          onChange={handleAmountChange} // Capture full amount with 100,000,000 max limit
                          placeholder="Enter amount"
                          className={styles.inputInline}
                        />.
                      </p>
                    ) : (
                      <>
                        {/* Fiat and Crypto Currency Selection */}
                        {!fiatCurrency ? (
                          <p>
                            I want to {rampOption.toLowerCase()} <strong>{amount}</strong> from <strong>{country}</strong>{' '}
                            to{' '}
                            <select
                              value={fiatCurrency}
                              onChange={(e) => setFiatCurrency(e.target.value)}
                              className={styles.selectInline}
                            >
                              <option value="">Select Fiat Currency</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                              <option value="INR">INR</option>
                            </select>
                            .
                          </p>
                        ) : !cryptoCurrency ? (
                          <p>
                            I want to {rampOption.toLowerCase()} <strong>{amount}</strong> from <strong>{country}</strong>{' '}
                            to <strong>{fiatCurrency}</strong> and convert to{' '}
                            <select
                              value={cryptoCurrency}
                              onChange={(e) => setCryptoCurrency(e.target.value)}
                              className={styles.selectInline}
                            >
                              <option value="">Select Cryptocurrency</option>
                              <option value="USDC">USDC</option>
                              <option value="USDT">USDT</option>
                              <option value="EUR.e">EUR.e</option>
                              <option value="BTC">BTC</option>
                            </select>
                            .
                          </p>
                        ) : (
                          <>
                            {/* Payment Method Selection */}
                            {!paymentMethod ? (
                              <p>
                                I want to {rampOption.toLowerCase()} <strong>{amount}</strong> using{' '}
                                <select
                                  value={paymentMethod}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  className={styles.selectInline}
                                >
                                  <option value="">Select Payment Method</option>
                                  {getPaymentMethods().map((method) => (
                                    <option key={method} value={method}>
                                      {method}
                                    </option>
                                  ))}
                                </select>
                                .
                              </p>
                            ) : (
                              <>
                                {/* Service Recommendation */}
                                <p>
                                  I want to {rampOption.toLowerCase()} <strong>{amount}</strong> using{' '}
                                  <strong>{paymentMethod}</strong>.
                                </p>

                                {!serviceRecommendation ? (
                                  <button
                                    onClick={getServiceRecommendation}
                                    className={styles.recommendButton}
                                  >
                                    Get Service Recommendation
                                  </button>
                                ) : (
                                  <p>
                                    Based on your needs, we recommend using{' '}
                                    <strong>{serviceRecommendation}</strong>.
                                  </p>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

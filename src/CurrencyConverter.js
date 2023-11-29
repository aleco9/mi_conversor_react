import React, { Component } from 'react';
import axios from 'axios';

class CurrencyConverter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rates: {},
      base: 'USD',
      amount: 1,
      convertedAmount: 0,
      currency: 'MXN'
    };
  }

  componentDidMount() {
    axios.get('http://data.fixer.io/api/latest?access_key=0dfe3c11b586e5b59e0f23668f0d0927&symbols=USD,EUR,MXN,BRL,ARS,CLP,PEN,COP,UYU,BOB,PYG,VEF,EUR,USD,GTQ,HNL,NIO,CRC,PAB')
      .then(response => {
        const rates = response.data.rates;
        this.setState({ rates });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleAmountChange = (event) => {
    const amount = event.target.value;
    if (amount < 0) {
      alert('Amount must be a positive number');
      return;
    }
    this.setState({ amount });
  }

  handleBaseChange = (event) => {
    const base = event.target.value;
    this.setState({ base }, this.handleConvert);
  }

  handleCurrencyChange = (event) => {
    const currency = event.target.value;
    this.setState({ currency }, this.handleConvert);
  }

  handleConvert = () => {
    const { rates, base, amount, currency } = this.state;
    const rate = rates[currency] / rates[base];
    const convertedAmount = amount * rate;
    this.setState({ convertedAmount });
  }

  render() {
    const { rates, base, amount, convertedAmount, currency } = this.state;

    return (
      <div>
        <h1>CONVERSOS DE DIVISAS</h1>
        <div>
          <label>MONTO : </label>
          <input type="number" value={amount} onChange={this.handleAmountChange} />
        </div>
        <div>
          <label>DE : </label>
          <select value={base} onChange={this.handleBaseChange}>
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <div>
          <label>A : </label>
          <select value={currency} onChange={this.handleCurrencyChange}>
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <button onClick={this.handleConvert}>Convertir</button>
        <div>
          {amount} {base} es igual a : {convertedAmount.toFixed(2)} {currency}
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(1)

  // const [rates, setRates] = useState({})
  const ratesRef = useRef({})

  useEffect(()=>{
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
    .then((json) => {
      // setRates(json.rates);
      ratesRef.current = json.rates
      onChangeToPrice(1)
    }).catch(err=>{
      console.warn(err)
      alert('не удалось получить информацию')
    })
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
    setFromPrice(result)
    setToPrice(value);
  }

  useEffect(()=>{
    onChangeFromPrice(fromPrice)
  },[fromCurrency])

  useEffect(()=>{
    onChangeFromPrice(toPrice)
  },[toCurrency])

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
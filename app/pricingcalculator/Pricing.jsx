"use client"

import { useState, useEffect } from 'react';

export default function PricingCalculator() {
  const [price, setPrice] = useState(0);
  const [pricingMethod, setPricingMethod] = useState('cost');
  const [cost, setCost] = useState(0);
  const [desiredProfitPercent, setDesiredProfitPercent] = useState(0);
  const [competitorPrice, setCompetitorPrice] = useState(0);
  const [valueToCustomer, setValueToCustomer] = useState(0);

  useEffect(() => {
    calculatePrice();
  }, [cost, desiredProfitPercent, competitorPrice, valueToCustomer, pricingMethod]);

  const calculatePrice = () => {
    let totalPrice = 0;
    if (pricingMethod === 'cost') {
      const profitAmount = cost * (desiredProfitPercent / 100);
      totalPrice = cost + profitAmount;
    } else if (pricingMethod === 'competitor') {
      const markupPercent = 0.2;
      totalPrice = competitorPrice * (1 + markupPercent);
    } else if (pricingMethod === 'value') {
      const discountPercent = 0.8;
      totalPrice = valueToCustomer * discountPercent;
    }
    setPrice(totalPrice.toFixed(2));
  };

  return (
    <div className="mx-auto max-w-md bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Pricing Calculator</h1>
      <PricingMethodSelector pricingMethod={pricingMethod} onPricingMethodChange={setPricingMethod} />
      
      {pricingMethod === 'cost' && <CostFields cost={cost} onCostChange={setCost} desiredProfitPercent={desiredProfitPercent} onDesiredProfitPercentChange={setDesiredProfitPercent} />}
      {pricingMethod === 'competitor' && <CompetitorFields competitorPrice={competitorPrice} onCompetitorPriceChange={setCompetitorPrice} />}
      {pricingMethod === 'value' && <ValueFields valueToCustomer={valueToCustomer} onValueToCustomerChange={setValueToCustomer} />}
      
      <TotalPriceDisplay price={price} />
    </div>
  );
}

const PricingMethodSelector = ({pricingMethod, onPricingMethodChange}) => {
  return (
    <select 
      value={pricingMethod}
      onChange={e => onPricingMethodChange(e.target.value)}
      className="w-full border bg-white rounded px-3 py-2 outline-none mb-4"
    >
      <option value="cost">Cost Based</option>
      <option value="competitor">Competitor Based</option>  
      <option value="value">Value Based</option>
    </select>
  );
}

const CostFields = ({cost, onCostChange, desiredProfitPercent, onDesiredProfitPercentChange}) => {
  return (
    <>
      <input 
        type="number"
        value={cost}
        onChange={e => onCostChange(parseFloat(e.target.value))}
        className="w-full border bg-white rounded px-3 py-2 outline-none mb-4"
        placeholder="Cost"
      />
      <input
        type="number"
        value={desiredProfitPercent}
        onChange={e => onDesiredProfitPercentChange(parseFloat(e.target.value))}
        className="w-full border bg-white rounded px-3 py-2 outline-none mb-4"
        placeholder="Desired Profit Percent"
      />
    </>
  );
}

const CompetitorFields = ({competitorPrice, onCompetitorPriceChange}) => {
  return (
    <input
      type="number" 
      value={competitorPrice}
      onChange={e => onCompetitorPriceChange(parseFloat(e.target.value))}
      className="w-full border bg-white rounded px-3 py-2 outline-none mb-4"
      placeholder="Competitor's Price"
    />
  );
}

const ValueFields = ({valueToCustomer, onValueToCustomerChange}) => {
  return (
    <input
      type="number"
      value={valueToCustomer} 
      onChange={e => onValueToCustomerChange(parseFloat(e.target.value))}
      className="w-full border bg-white rounded px-3 py-2 outline-none mb-4"
      placeholder="Value to Customer"
    />
  );
}

const TotalPriceDisplay = ({price}) => {
  return (
    <div className="mt-4">
      <p className="font-bold text-gray-700">Total Price: ${price}</p>
    </div>
  );
}

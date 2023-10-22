"use client"
import { useState } from "react";

export default function ValueBasedPricing() {

  const [highestWTP, setHighestWTP] = useState("");
  const [lowestWTP, setLowestWTP] = useState("");
  const [competition, setCompetition] = useState(0);
  const [competitionValue, setCompetitionValue] = useState(0);
  const [marketConditions, setMarketConditions] = useState(0);
  const [costStructure, setCostStructure] = useState(0);
  const [costStructureValue, setCostStructureValue] = useState(0);
  const [valueBasedPrice, setValueBasedPrice] = useState("");

  const calculateValueBasedPrice = () => {
    const highestWTPNum = parseFloat(highestWTP);
    const lowestWTPNum = parseFloat(lowestWTP);

    const minPrice = lowestWTPNum 
  const maxPrice = highestWTPNum

  let price = (maxPrice + minPrice) / 2 // Midpoint

  // Adjust for other factors
  if(competition > 0) {
    price = price * (1 - competition/10)  
  }

  if(marketConditions > 0) {
    price = price * (1 + marketConditions/10)
  }

  if(costStructure > 0) {
    price = price * (1 + costStructure/10) 
  }

  // Update state



    
    // Calculate price based on inputs
    
    setValueBasedPrice(price); 
  };

 
  const [marketConditionsValue, setMarketConditionsValue] = useState(0);
  

  return (
    <>
      <div className="bg-gray min-h-screen flex items-center justify-center py-20">
        <div className="max-w-xl bg-white rounded-lg shadow-lg p-8">
          
          <h1 className="text-2xl font-bold text-primary"> 
            Value-Based Pricing Calculator
          </h1>
          
          <label className="text-gray-700">
            Highest Willingness to Pay
            <input 
              className="w-full border p-2 my-4"
              type="number" 
              min="0"
              step="0.01"
              value={highestWTP}
              onChange={(e) => setHighestWTP(e.target.value)} 
            />
          </label>
          
          <label className="text-gray-700">
            Lowest Willingness to Pay
            <input
              className="w-full border p-2 my-4"
              type="number"
              min="0"
              step="0.01"
              value={lowestWTP}
              onChange={(e) => setLowestWTP(e.target.value)} 
            />
          </label>
          
          <div className="flex flex-col items-center w-full">
          <p>{competitionValue}</p> 
            <p className="text-gray-700" id="competition-slider">Competition</p>
            <input 
              className="w-4/5 my-4"
              type="range" 
              min="-1" 
              max="1"
              step="0.1"
              value={competition}
              onChange={(e) => {
                setCompetition(e.target.value);
                setCompetitionValue(e.target.value); 
              }} 
            />
                  <p>{marketConditionsValue}</p>
            <p className="text-gray-700" id="market-conditions-slider">Market Conditions</p>
            <input
              className="w-4/5 my-4" 
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={marketConditions}
              onChange={(e) => {
                setMarketConditions(e.target.value);
                setMarketConditionsValue(e.target.value);
              }}
            />
              <p>{costStructureValue}</p>
            <p className="text-gray-700" id="cost-structure-slider">Cost Structure</p>
            <input
              className="w-4/5 my-4"
              type="range"
              min="-1"
              max="1" 
              step="0.1"
              value={costStructure}
              onChange={(e) => {
                setCostStructure(e.target.value);
                setCostStructureValue(e.target.value);
              }}
            />
          </div>
          
          <button 
            onClick={calculateValueBasedPrice} 
            className="bg-primary text-white py-2 px-4 rounded hover:bg-indigo-600 mb-4 w-full">
            Calculate
          </button>
       
        </div>
      </div>

      {valueBasedPrice && (
        <div className="mt-0 mb-24 text-center ">
          <p className="text-xl font-bold text-primary"> 
            Value-Based Price: ${valueBasedPrice}
          </p>
        </div>
      )}
    </>
  );
}
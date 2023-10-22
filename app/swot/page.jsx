"use client"
import { useState } from 'react'

export default function SwotGenerator() {

  const [strengths, setStrengths] = useState([]) 
  const [weaknesses, setWeaknesses] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [threats, setThreats] = useState([])


  const StrengthsForm = ({strengths, onAddStrength}) => {

    const [newStrength, setNewStrength] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onAddStrength(newStrength)
      setNewStrength('')
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="textArea"
          placeholder="Add strength"
          value={newStrength}
          onChange={(e) => setNewStrength(e.target.value)}
          className="border p-2 mb-4"  
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    )
  
  }

  const WeaknessesForm = ({weaknesses, onAddWeakness}) => {

    const [newWeakness, setNewWeakness] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onAddWeakness(newWeakness)
      setNewWeakness('')
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Add weakness"
          value={newWeakness}
          onChange={(e) => setNewWeakness(e.target.value)}
          className="border p-2 mb-4"  
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    )
  
  }

  // Inside SwotGenerator component

const OpportunitiesForm = ({opportunities, onAddOpportunity}) => {

    const [newOpportunity, setNewOpportunity] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onAddOpportunity(newOpportunity)
      setNewOpportunity('')
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Add opportunity"
          value={newOpportunity}
          onChange={(e) => setNewOpportunity(e.target.value)}
          className="border p-2 mb-4"  
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    )
  
  }

const ThreatsForm = ({threats, onAddThreat}) => {

    const [newThreat, setNewThreat] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onAddThreat(newThreat)
      setNewThreat('')
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Add threat"
          value={newThreat}
          onChange={(e) => setNewThreat(e.target.value)}
          className="border p-2 mb-4"  
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    )
  
  }

  return (
    <div className="bg-gray-100 p-10">
      
      <h1 className="text-2xl font-bold mb-10">SWOT Analysis Generator</h1>
      
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Strengths</h2>
        <StrengthsForm 
          strengths={strengths}
          onAddStrength={(text) => setStrengths([...strengths, text])} 
        />
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Weaknesses</h2>
        <WeaknessesForm
          weaknesses={weaknesses}
          onAddWeakness={(text) => setWeaknesses([...weaknesses, text])} 
        />
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Opportunities</h2>
        <OpportunitiesForm  
          opportunities={opportunities}
          onAddOpportunity={(text) => setOpportunities([...opportunities, text])}
        />
      </div>

      <div>
        <h2 className="font-semibold mb-2">Threats</h2>
        <ThreatsForm
          threats={threats}
          onAddThreat={(text) => setThreats([...threats, text])}
        />
      </div>

      <SwotTable 
        strengths={strengths}
        weaknesses={weaknesses}
        opportunities={opportunities}
        threats={threats}
      />

    </div>
  )

}

// Sub-components for each input form 
const StrengthsForm = ({strengths, onAddStrength}) => {
  // return input, button
}

const WeaknessesForm = ({weaknesses, onAddWeakness}) => {
  // return input, button 
}

// etc...

const SwotTable = ({strengths, weaknesses, opportunities, threats}) => {
  // return rendered table
}

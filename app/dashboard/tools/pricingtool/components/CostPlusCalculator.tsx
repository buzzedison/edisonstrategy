"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const CostPlusCalculator = () => {
  const [directCostItems, setDirectCostItems] = useState<{ name: string; cost: number }[]>([]);
  const [indirectCostItems, setIndirectCostItems] = useState<{ name: string; cost: number }[]>([]);
  const [productionQuantity, setProductionQuantity] = useState(100);
  const [markupPercentage, setMarkupPercentage] = useState(0);
  const [currency, setCurrency] = useState("$");
  const [companyName, setCompanyName] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const totalDirectCosts = directCostItems.reduce((a, b) => a + b.cost, 0);
  const totalIndirectCosts = indirectCostItems.reduce((a, b) => a + b.cost, 0);
  const totalCostForQuantity = totalDirectCosts + totalIndirectCosts;
  const unitCost = productionQuantity > 0 ? totalCostForQuantity / productionQuantity : 0;
  const markupAmount = unitCost * (markupPercentage / 100);
  const sellingPricePerUnit = unitCost + markupAmount;

  const addCostItem = (type: 'direct' | 'indirect') => {
    const setter = type === 'direct' ? setDirectCostItems : setIndirectCostItems;
    setter(prev => [...prev, { name: "", cost: 0 }]);
  };

  const removeCostItem = (type: 'direct' | 'indirect', index: number) => {
    const setter = type === 'direct' ? setDirectCostItems : setIndirectCostItems;
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const updateCostItem = (type: 'direct' | 'indirect', index: number, field: 'name' | 'cost', value: string | number) => {
    const setter = type === 'direct' ? setDirectCostItems : setIndirectCostItems;
    setter(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const downloadPDF = () => {
    if (resultsRef.current) {
      html2canvas(resultsRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${companyName || 'Company'}_Cost_Plus_Pricing.pdf`);
      });
    }
  };

  const renderCostSection = (type: 'direct' | 'indirect') => {
    const items = type === 'direct' ? directCostItems : indirectCostItems;
    const title = type === 'direct' ? 'Direct Costs' : 'Indirect Costs (Overhead)';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: type === 'direct' ? 0.2 : 0.4 }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        {items.map((item, index) => (
          <div key={index} className="mb-4 flex items-center space-x-4">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateCostItem(type, index, 'name', e.target.value)}
              placeholder="Item name"
              className="flex-grow px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
            />
            <input
              type="number"
              value={item.cost}
              onChange={(e) => updateCostItem(type, index, 'cost', parseFloat(e.target.value) || 0)}
              placeholder="Cost"
              className="w-32 px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
            />
            <button
              onClick={() => removeCostItem(type, index)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        <button
          onClick={() => addCostItem(type)}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        >
          Add {type === 'direct' ? 'Direct' : 'Indirect'} Cost Item
        </button>
      </motion.div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-12 text-center text-gray-800"
        >
          Cost-Plus Pricing Calculator
        </motion.h2>

        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-4">Company Information</h3>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none mb-4"
            />
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="Currency symbol"
              className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
            />
          </motion.div>

          {renderCostSection('direct')}
          {renderCostSection('indirect')}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-4">Production Quantity and Markup</h3>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="productionQuantity" className="block font-bold mb-2">
                  Production Quantity
                </label>
                <input
                  type="number"
                  id="productionQuantity"
                  value={productionQuantity}
                  onChange={(e) => setProductionQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="markupPercentage" className="block font-bold mb-2">
                  Markup Percentage
                </label>
                <input
                  type="number"
                  id="markupPercentage"
                  value={markupPercentage}
                  onChange={(e) => setMarkupPercentage(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-3xl text-white"
          >
            <h3 className="text-3xl font-bold mb-6">Calculation Results for {companyName || 'Your Company'}</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-lg">Total Cost for {productionQuantity} Units:</p>
                <p className="text-2xl">{currency}{totalCostForQuantity.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-bold text-lg">Cost Per Unit:</p>
                <p className="text-2xl">{currency}{unitCost.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-bold text-lg">Markup Amount Per Unit:</p>
                <p className="text-2xl">{currency}{markupAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-bold text-lg">Selling Price Per Unit:</p>
                <p className="text-3xl font-bold">{currency}{sellingPricePerUnit.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8"
          >
            <button
              onClick={downloadPDF}
              className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
            >
              Download Results as PDF
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8"
          >
            <h3 className="text-2xl font-bold mb-4">Additional Pricing Considerations</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Market demand and competition analysis</li>
              <li>Value-based pricing strategies</li>
              <li>Price elasticity of demand</li>
              <li>Product lifecycle stage</li>
              <li>Seasonal pricing adjustments</li>
              <li>Volume discounts and promotional pricing</li>
              <li>Geographic pricing variations</li>
              <li>Customer segment-specific pricing</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CostPlusCalculator;

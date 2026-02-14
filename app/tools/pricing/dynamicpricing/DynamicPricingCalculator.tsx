"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Chart, registerables } from "chart.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { supabase } from "../../../../lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';

Chart.register(...registerables);

const DynamicPricingCalculator = () => {
  const [basePrice, setBasePrice] = useState<number>(100);
  const [demandLevel, setDemandLevel] = useState<string>("Medium");
  const [supplyLevel, setSupplyLevel] = useState<string>("Medium");
  const [dynamicPrice, setDynamicPrice] = useState<number>(0);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [savedCalculations, setSavedCalculations] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [calculationName, setCalculationName] = useState("");
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        fetchSavedCalculations(session.user.id);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    calculateDynamicPrice();
  }, [basePrice, demandLevel, supplyLevel]);

  const calculateDynamicPrice = () => {
    const demandFactors = { High: 1.5, Medium: 1, Low: 0.8 };
    const supplyFactors = { High: 0.9, Medium: 1, Low: 1.3 };

    const demandFactor = demandFactors[demandLevel as keyof typeof demandFactors] || 1;
    const supplyFactor = supplyFactors[supplyLevel as keyof typeof supplyFactors] || 1;

    const adjustedPrice = basePrice * demandFactor * supplyFactor;
    setDynamicPrice(adjustedPrice);

    setPriceHistory((prevHistory) => [...prevHistory, adjustedPrice]);
    renderChart();
  };

  const renderChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: Array.from({ length: priceHistory.length }, (_, i) => i + 1),
            datasets: [
              {
                label: "Price over time",
                data: priceHistory,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: { title: { display: true, text: "Step" } },
              y: { title: { display: true, text: "Price ($)" } },
            },
          },
        });
      }
    }
  };

  const exportPDF = () => {
    html2canvas(chartRef.current as HTMLCanvasElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Dynamic_Pricing_Report.pdf");
    });
  };

  const saveCalculation = async () => {
    if (!user) {
      setStatusMessage("Sign in to save calculations.");
      return;
    }

    if (!calculationName.trim()) {
      setStatusMessage("Add a name for this calculation.");
      return;
    }

    const calculationData = {
      user_id: user.id,
      name: calculationName,
      base_price: basePrice,
      demand_level: demandLevel,
      supply_level: supplyLevel,
      dynamic_price: dynamicPrice,
      price_history: priceHistory,
    };

    const { data, error } = await supabase
      .from('dynamic_pricing_calculations')
      .insert([calculationData]);

    if (error) {
      setStatusMessage(`Error saving calculation: ${error.message}`);
    } else {
      setStatusMessage("Calculation saved.");
      fetchSavedCalculations(user.id);
    }
  };

  const fetchSavedCalculations = async (userId: string) => {
    const { data, error } = await supabase
      .from('dynamic_pricing_calculations')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      setStatusMessage(`Error fetching saved calculations: ${error.message}`);
    } else {
      setSavedCalculations(data || []);
    }
  };

  const loadCalculation = (calculation: any) => {
    setBasePrice(calculation.base_price);
    setDemandLevel(calculation.demand_level);
    setSupplyLevel(calculation.supply_level);
    setDynamicPrice(calculation.dynamic_price);
    setPriceHistory(calculation.price_history);
    setCalculationName(calculation.name);
    renderChart();
  };

  const deleteCalculation = async (id: number) => {
    const { error } = await supabase
      .from('dynamic_pricing_calculations')
      .delete()
      .eq('id', id);

    if (error) {
      setStatusMessage(`Error deleting calculation: ${error.message}`);
    } else {
      setStatusMessage("Calculation deleted.");
      fetchSavedCalculations(user!.id);
    }
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
          Dynamic Price Calculator
        </motion.h2>

        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-bold mb-4">Enter your numbers</h3>

            <div className="mb-4">
              <label className="block font-bold mb-2">Base price ($)</label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(parseFloat(e.target.value))}
                className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Demand level</label>
              <select
                value={demandLevel}
                onChange={(e) => setDemandLevel(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Supply level</label>
              <select
                value={supplyLevel}
                onChange={(e) => setSupplyLevel(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <button
              onClick={calculateDynamicPrice}
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Update price
            </button>
          </motion.div>

          {dynamicPrice > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-8">
              <h3 className="text-3xl font-bold mb-6">Suggested price: ${dynamicPrice.toFixed(2)}</h3>

              <div className="flex space-x-4">
                <button onClick={exportPDF} className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300">
                  Download PDF
                </button>

                {user && (
                  <>
                    <input
                      type="text"
                      value={calculationName}
                      onChange={(e) => setCalculationName(e.target.value)}
                      placeholder="Name this scenario"
                      className="px-4 py-2 border rounded"
                    />
                    <button onClick={saveCalculation} className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300">
                      Save scenario
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Price trend</h3>
            <canvas ref={chartRef} className="w-full h-96"></canvas>
          </motion.div>

          {statusMessage && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">
              {statusMessage}
            </motion.div>
          )}

          {user && savedCalculations.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Saved scenarios</h3>
              <ul className="space-y-2">
                {savedCalculations.map((calc) => (
                  <li key={calc.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <span>{calc.name}</span>
                    <div>
                      <button onClick={() => loadCalculation(calc)} className="px-3 py-1 bg-blue-500 text-white rounded mr-2">Load</button>
                      <button onClick={() => deleteCalculation(calc.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DynamicPricingCalculator;

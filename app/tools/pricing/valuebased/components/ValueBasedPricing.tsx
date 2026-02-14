"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Chart, registerables } from "chart.js";
import { supabase } from "../../../../../lib/supabaseClient";

Chart.register(...registerables);

const ValueBasedPricing = () => {
  const [perceivedValue, setPerceivedValue] = useState<number>(0);
  const [costPerUnit, setCostPerUnit] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [customerSegment, setCustomerSegment] = useState<string>("");
  const [recommendedPrice, setRecommendedPrice] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [savedTemplates, setSavedTemplates] = useState<any[]>([]);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        fetchSavedTemplates();
      }
    };
    fetchSession();
  }, []);

  const calculatePrice = () => {
    if (perceivedValue && costPerUnit && competitorPrice) {
      const suggestedPrice = (perceivedValue + competitorPrice) / 2; // Basic formula to average perceived value and competitor price
      setRecommendedPrice(suggestedPrice);

      const margin = ((suggestedPrice - costPerUnit) / suggestedPrice) * 100; // Profit margin calculation
      setProfitMargin(margin);

      renderChart();
    }
  };

  const saveTemplate = async () => {
    if (!user) {
      alert("Sign in to save this.");
      return;
    }

    const { data, error } = await supabase.from("value_based_templates").insert([
      {
        user_id: user.id,
        customer_segment: customerSegment,
        perceived_value: perceivedValue,
        cost_per_unit: costPerUnit,
        competitor_price: competitorPrice,
        recommended_price: recommendedPrice,
        profit_margin: profitMargin,
      },
    ]);

    if (error) {
      console.error("Error saving template:", error);
    } else {
      console.log("Template saved:", data);
      fetchSavedTemplates();
    }
  };

  const fetchSavedTemplates = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("value_based_templates")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching templates:", error);
    } else {
      setSavedTemplates(data);
    }
  };

  const loadTemplate = (template: any) => {
    setCustomerSegment(template.customer_segment);
    setPerceivedValue(template.perceived_value);
    setCostPerUnit(template.cost_per_unit);
    setCompetitorPrice(template.competitor_price);
    setRecommendedPrice(template.recommended_price);
    setProfitMargin(template.profit_margin);
    renderChart();
  };

  const exportPDF = () => {
    if (resultsRef.current && graphRef.current) {
      html2canvas(resultsRef.current as HTMLElement).then((resultsCanvas) => {
        html2canvas(graphRef.current as HTMLElement).then((graphCanvas) => {
          const pdf = new jsPDF();
          const pdfWidth = pdf.internal.pageSize.getWidth();
          
          // Add results to PDF
          const resultsImgData = resultsCanvas.toDataURL("image/png");
          const resultsImgProps = pdf.getImageProperties(resultsImgData);
          const resultsHeight = (resultsImgProps.height * pdfWidth) / resultsImgProps.width;
          pdf.addImage(resultsImgData, "PNG", 0, 0, pdfWidth, resultsHeight);
          
          // Add graph to PDF
          const graphImgData = graphCanvas.toDataURL("image/png");
          const graphImgProps = pdf.getImageProperties(graphImgData);
          const graphHeight = (graphImgProps.height * pdfWidth) / graphImgProps.width;
          pdf.addPage();
          pdf.addImage(graphImgData, "PNG", 0, 0, pdfWidth, graphHeight);
          
          pdf.save(`${customerSegment || "Value_Based_Pricing"}.pdf`);
        });
      });
    }
  };

  const renderChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const competitorPrices = Array.from({ length: 10 }, (_, i) => competitorPrice * (i + 1) / 10);
        const perceivedValues = Array.from({ length: 10 }, (_, i) => perceivedValue * (i + 1) / 10);
        const recommendedPrices = competitorPrices.map((compPrice, i) => (compPrice + perceivedValues[i]) / 2);

        const newChartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: Array.from({ length: 10 }, (_, i) => `Option ${i + 1}`),
            datasets: [
              {
                label: "Competitor prices",
                data: competitorPrices,
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                fill: false,
              },
              {
                label: "Perceived value",
                data: perceivedValues,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
              },
              {
                label: "Recommended price",
                data: recommendedPrices,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: { 
                display: true, 
                title: { display: true, text: "Scenario" } 
              },
              y: { 
                display: true, 
                title: { display: true, text: "Price ($)" } 
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                    }
                    return label;
                  }
                }
              }
            }
          },
        });

        setChartInstance(newChartInstance);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 md:pt-24">
      <h1 className="text-3xl font-bold mb-6">Value-Based Price Calculator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2">Customer segment</label>
          <input
            type="text"
            value={customerSegment}
            onChange={(e) => setCustomerSegment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. Premium, Budget, SMB"
          />
          <p className="text-sm text-gray-600 mt-1">
            Example: Premium buyers, budget buyers, or small business teams.
          </p>
        </div>
        <div>
          <label className="block mb-2">Perceived value ($)</label>
          <input
            type="number"
            value={perceivedValue}
            onChange={(e) => setPerceivedValue(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="What customers think it's worth"
          />
          <p className="text-sm text-gray-600 mt-1">
            Enter an estimate of what this offer is worth to your target customer.
          </p>
        </div>
        <div>
          <label className="block mb-2">Cost per unit ($)</label>
          <input
            type="number"
            value={costPerUnit}
            onChange={(e) => setCostPerUnit(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Your cost per unit"
          />
          <p className="text-sm text-gray-600 mt-1">
            Include production, fulfillment, and handling costs.
          </p>
        </div>
        <div>
          <label className="block mb-2">Competitor price ($)</label>
          <input
            type="number"
            value={competitorPrice}
            onChange={(e) => setCompetitorPrice(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Closest competitor price"
          />
          <p className="text-sm text-gray-600 mt-1">
            Use a realistic market number from similar offers.
          </p>
        </div>
      </div>

      <button
        onClick={calculatePrice}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate recommended price
      </button>

      {recommendedPrice > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-6 bg-gray-100 rounded-lg"
          ref={resultsRef}
        >
          <h2 className="text-2xl font-bold mb-4">Your result</h2>
          <p className="mb-2">
            <strong>Recommended price:</strong> ${recommendedPrice.toFixed(2)}
          </p>
          <p className="mb-2">
            <strong>Profit margin:</strong> {profitMargin.toFixed(2)}%
          </p>
        </motion.div>
      )}

      <div ref={graphRef} className="mt-8">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="mt-8">
        <button
          onClick={saveTemplate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
        >
          Save
        </button>
        <button
          onClick={exportPDF}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Download PDF
        </button>
      </div>

      {savedTemplates.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Saved templates</h2>
          <ul>
            {savedTemplates.map((template, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => loadTemplate(template)}
                  className="text-blue-500 hover:underline"
                >
                  {template.customer_segment || `Saved set ${index + 1}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ValueBasedPricing;

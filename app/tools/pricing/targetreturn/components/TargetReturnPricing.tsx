"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Chart, registerables } from "chart.js";
import { supabase } from "../../../../../lib/supabaseClient";

Chart.register(...registerables);

const TargetReturnCalculator = () => {
  const [costPerUnit, setCostPerUnit] = useState<number>(0);
  const [desiredROI, setDesiredROI] = useState<number>(0);
  const [expectedSalesVolume, setExpectedSalesVolume] = useState<number>(0);
  const [fixedCosts, setFixedCosts] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [breakEvenPoint, setBreakEvenPoint] = useState<number>(0);
  const [productName, setProductName] = useState<string>("");
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

  const calculateSellingPrice = () => {
    if (costPerUnit && desiredROI && expectedSalesVolume && fixedCosts) {
      const totalCost = (costPerUnit * expectedSalesVolume) + fixedCosts;
      const targetProfit = totalCost * (desiredROI / 100);
      const requiredRevenue = totalCost + targetProfit;
      const price = requiredRevenue / expectedSalesVolume;
      setSellingPrice(price);

      const breakEven = fixedCosts / (price - costPerUnit);
      setBreakEvenPoint(breakEven);

      renderChart();
    }
  };

  const saveTemplate = async () => {
    if (!user) {
      alert("Sign in to save this.");
      return;
    }

    const { data, error } = await supabase.from("target_return_templates").insert([
      {
        user_id: user.id,
        product_name: productName,
        cost_per_unit: costPerUnit,
        desired_roi: desiredROI,
        expected_sales_volume: expectedSalesVolume,
        fixed_costs: fixedCosts,
        selling_price: sellingPrice,
        break_even_point: breakEvenPoint,
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
      .from("target_return_templates")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching templates:", error);
    } else {
      setSavedTemplates(data);
    }
  };

  const loadTemplate = (template: any) => {
    setProductName(template.product_name);
    setCostPerUnit(template.cost_per_unit);
    setDesiredROI(template.desired_roi);
    setExpectedSalesVolume(template.expected_sales_volume);
    setFixedCosts(template.fixed_costs);
    setSellingPrice(template.selling_price);
    setBreakEvenPoint(template.break_even_point);
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
          
          pdf.save(`${productName || "Target_Return_Pricing"}.pdf`);
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
        const salesVolumes = Array.from({length: 20}, (_, i) => Math.round(expectedSalesVolume * (i + 1) / 10));
        const totalCosts = salesVolumes.map(volume => fixedCosts + (costPerUnit * volume));
        const revenues = salesVolumes.map(volume => sellingPrice * volume);

        const newChartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: salesVolumes,
            datasets: [
              {
                label: "Total cost",
                data: totalCosts,
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                fill: false,
              },
              {
                label: "Revenue",
                data: revenues,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: { 
                type: 'linear',
                display: true, 
                title: { display: true, text: "Units sold" } 
              },
              y: { 
                type: 'linear',
                display: true, 
                title: { display: true, text: "Amount ($)" } 
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
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-12 text-center text-gray-800"
        >
          Target Return Price Calculator
        </motion.h2>

        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Enter your numbers</h3>

            <div className="mb-4">
              <label className="block font-bold mb-2">Product name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Cost per unit</label>
              <input
                type="number"
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(parseFloat(e.target.value))}
                className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Target profit (%)</label>
              <input
                type="number"
                value={desiredROI}
                onChange={(e) => setDesiredROI(parseFloat(e.target.value))}
                className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Expected units sold</label>
              <input
                type="number"
                value={expectedSalesVolume}
                onChange={(e) => setExpectedSalesVolume(parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Fixed costs</label>
              <input
                type="number"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(parseFloat(e.target.value))}
                className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
              />
            </div>

            <button
              onClick={calculateSellingPrice}
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Calculate price
            </button>
          </motion.div>

          {sellingPrice > 0 && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              <h3 className="text-3xl font-bold mb-6">
                Recommended price: ${sellingPrice.toFixed(2)}
              </h3>
              <p className="text-xl mb-4">
                Break-even: {breakEvenPoint.toFixed(2)} units
              </p>

              <button
                onClick={saveTemplate}
                className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
              >
                Save
              </button>

              <button
                onClick={exportPDF}
                className="px-6 py-3 ml-4 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
              >
                Download PDF
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <h3 className="text-2xl font-bold mb-4">Saved templates</h3>
            <ul>
              {savedTemplates.map((template) => (
                <li key={template.id} className="mb-4">
                  <p>
                    {template.product_name || "Untitled"} | Price: ${template.selling_price.toFixed(2)} | Break-even: {template.break_even_point.toFixed(2)} units
                  </p>
                  <button
                    onClick={() => loadTemplate(template)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full"
                  >
                    Load
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            ref={graphRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <h3 className="text-2xl font-bold mb-4">Sales chart</h3>
            <canvas ref={chartRef} className="w-full h-96"></canvas>
            <p className="mt-4 text-gray-600">
              This chart shows when revenue passes total cost. Where the lines meet is your break-even point.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TargetReturnCalculator;

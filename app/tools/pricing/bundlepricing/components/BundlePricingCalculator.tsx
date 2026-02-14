"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../../../lib/supabaseClient";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const BundlePricingCalculator = () => {
  const [products, setProducts] = useState<{ name: string; cost: number }[]>([]);
  const [bundleDiscount, setBundleDiscount] = useState<number>(0);
  const [bundlePrice, setBundlePrice] = useState<number>(0);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [savedBundles, setSavedBundles] = useState<any[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        fetchSavedBundles();
      }
    };
    fetchSession();
  }, []);

  // Add a new product to the bundle
  const addProduct = () => {
    setProducts([...products, { name: "", cost: 0 }]);
  };

  // Remove a product from the bundle
  const removeProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Update product details
  const updateProduct = (index: number, field: "name" | "cost", value: string | number) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  // Calculate the bundle price based on individual product costs and discount
  const calculateBundlePrice = () => {
    const totalCost = products.reduce((acc, product) => acc + product.cost, 0);
    const discountAmount = totalCost * (bundleDiscount / 100);
    setBundlePrice(totalCost - discountAmount);
  };

  // Save the bundle configuration to Supabase
  const saveBundle = async () => {
    if (!user) {
      alert("Sign in to save this bundle.");
      return;
    }

    const { data, error } = await supabase.from("bundle_pricing").insert([
      {
        user_id: user.id,
        products,
        bundle_discount: bundleDiscount,
        bundle_price: bundlePrice,
      },
    ]);

    if (error) {
      console.error("Error saving bundle:", error);
    } else {
      console.log("Bundle saved:", data);
      fetchSavedBundles();
    }
  };

  // Fetch saved bundles for the logged-in user
  const fetchSavedBundles = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("bundle_pricing")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching bundles:", error);
    } else {
      setSavedBundles(data);
    }
  };

  // Load a saved bundle configuration
  const loadBundle = (bundle: any) => {
    setProducts(bundle.products);
    setBundleDiscount(bundle.bundle_discount);
    setBundlePrice(bundle.bundle_price);
  };

  // Export the current bundle configuration as a PDF
  const exportPDF = () => {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Bundle_Pricing_Report.pdf");
    });
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
          Bundle Price Calculator
        </motion.h2>

        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Add products</h3>

            {products.map((product, index) => (
              <div key={index} className="mb-4 flex space-x-4">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => updateProduct(index, "name", e.target.value)}
                  placeholder="Product name"
                  className="w-1/2 px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
                />
                <input
                  type="number"
                  value={product.cost}
                  onChange={(e) => updateProduct(index, "cost", parseFloat(e.target.value))}
                  placeholder="Price ($)"
                  className="w-1/2 px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
                />
                <button
                  onClick={() => removeProduct(index)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={addProduct}
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Add product
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <h3 className="text-2xl font-bold mb-4">Bundle discount (%)</h3>
            <input
              type="number"
              value={bundleDiscount}
              onChange={(e) => setBundleDiscount(parseFloat(e.target.value))}
              className="w-full px-4 py-2 bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 outline-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <h3 className="text-3xl font-bold mb-6">Suggested bundle price: ${bundlePrice.toFixed(2)}</h3>
            <button
              onClick={calculateBundlePrice}
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Calculate
            </button>

            <button
              onClick={saveBundle}
              className="ml-4 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
            >
              Save bundle
            </button>

            <button
              onClick={exportPDF}
              className="ml-4 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
            >
              Download PDF
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <h3 className="text-2xl font-bold mb-4">Saved bundles</h3>
            {savedBundles.map((bundle, index) => (
              <div key={index} className="mb-2">
                <button
                  onClick={() => loadBundle(bundle)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-300"
                >
                  Load bundle {index + 1}
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BundlePricingCalculator;

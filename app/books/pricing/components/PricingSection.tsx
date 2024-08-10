"use client";

import { useState } from "react";
import Link from "next/link";
import PurchaseModal from "./PurchaseModal";

const PricingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseLink, setPurchaseLink] = useState("");

  const openModal = (link: string) => {
    setPurchaseLink(link);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="bg-gray-100 text-center py-24">
      <h1 className="text-4xl font-bold mt-4 lg:mt-12">Unleash the Power of Pricing</h1>
      <p className="text-xl mt-4">Transform your business strategy with effective pricing techniques</p>
      <div className="mt-8">
        <button
          onClick={() => openModal("https://www.amazon.com/Winning-Pricing-Strategy-ideal-market-ebook/dp/B09HMZCTXK")}
          className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded mx-2"
        >
          Buy on Amazon
        </button>
        <button
          onClick={() => openModal("https://buzzedison.gumroad.com/l/pricingstrategy")}
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Buy on Gumroad
        </button>
      </div>
      <PurchaseModal isOpen={isModalOpen} onClose={closeModal} purchaseLink={purchaseLink} />
    </section>
  );
};

export default PricingSection;
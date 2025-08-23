// app/subscribe/page.tsx

import React from 'react';
import SubscribeForm from './components/SubscribeForm';
import Link from 'next/link';

export default function SubscribePage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gray-100 py-10">
        <div className="text-center mb-8 pt-24">
          <h1 className="text-4xl font-bold mb-4">Build,Scale and Make Lasting Impact</h1>
          <p className="text-lg">Discover the secrets to accelerating your growth as a creator or founder with our exclusive content, expert tips, and valuable resources.</p>
        </div>
        <SubscribeForm />
      </div>
    </>
  );
}

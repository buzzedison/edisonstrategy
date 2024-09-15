// app/component/SubscribeForm.tsx

import React from 'react';

const SubscribeForm = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 py-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <form
          id="sib-form"
          method="POST"
          action="https://8687d87b.sibforms.com/serve/MUIFADxztfKGKnspqqTtUuqP9BuTN4wILIzq8JZlW9GOlHNIZflmOfUGvm7L1_SrzPmraGLuq1y4qePlkZikhM6_dv0BL-NHMn3e47yZ_n1kjT6oFGtjTrqFuITVREu5nzE3T7WncT-vK8xhcI6HuS2SgdaeXLEsGeVLSKKluXlvflsq9HDTivuwYHEqxSFhLtnS_vt45MJQeTl6"
          data-type="subscription"
        >
          <h2 className="text-2xl font-bold mb-4">Practical solutions for creators and founders</h2>
          <p className="mb-4">Subscribe to receive weekly tips to help you grow as a creator or founder</p>
          <div className="mb-4">
            <label htmlFor="EMAIL" className="block text-sm font-semibold text-gray-700">
              Enter your email address to subscribe
            </label>
            <input
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              type="email"
              id="EMAIL"
              name="EMAIL"
              placeholder="Your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="OPT_IN"
                name="OPT_IN"
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to receive your newsletters and accept the data privacy statement.
              </span>
            </label>
          </div>
          <div id="sib-captcha" className="mb-4"></div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeForm;

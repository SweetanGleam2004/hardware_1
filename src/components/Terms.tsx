import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-navy-900 mb-8">Terms and Conditions</h2>
      
      <div className="space-y-8 text-gray-700">
        <section>
          <h3 className="text-xl font-semibold text-navy-900 mb-3">1. Acceptance of Terms</h3>
          <p>By accessing and using BuildMart's services, you agree to be bound by these terms and conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-navy-900 mb-3">2. Product Information</h3>
          <p>We strive to display accurate product information, including prices and availability. However, we reserve the right to modify or update information without prior notice. Colors may vary depending on your display settings.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-navy-900 mb-3">3. Pricing and Payment</h3>
          <p>All prices are in Indian Rupees (INR). We reserve the right to modify prices without prior notice. Payment must be made in full before order processing begins.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-navy-900 mb-3">4. Shipping and Delivery</h3>
          <p>Delivery times are estimates only. We are not responsible for delays beyond our control. Risk of loss and title for items pass to you upon delivery to the carrier.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-navy-900 mb-3">5. Returns and Refunds</h3>
          <p>Products may be returned within 7 days of delivery if unused and in original packaging. Refunds will be processed within 14 business days of receiving the returned item.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-navy-900 mb-3">6. Privacy Policy</h3>
          <p>Your use of BuildMart's services is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-navy-900 mb-3">7. Account Security</h3>
          <p>You are responsible for maintaining the confidentiality of your account and password. Please notify us immediately of any unauthorized use of your account.</p>
        </section>
      </div>
    </div>
  );
}
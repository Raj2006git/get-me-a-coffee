"use client";
import React, { useState, useEffect } from 'react';

const Username = ({ params }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    amount: ''
  });
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch payments on component mount
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch(`/api/payments?username=${params.username}`);
      const data = await response.json();
      if (data.success) {
        setPayments(data.payments);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBrewClick = (amount) => {
    setFormData({
      ...formData,
      amount: amount.toString()
    });
  };

  const handlePayment = async () => {
    // Validation
    if (!formData.name || !formData.message || !formData.amount) {
      alert('Please fill all fields');
      return;
    }

    if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
          username: params.username
        }),
      });

      const data = await response.json();
      
      console.log('Response:', data); // Debug log

      if (data.success) {
        alert('Payment Successful ✅');
        // Clear form
        setFormData({ name: '', message: '', amount: '' });
        // Refresh payments list
        fetchPayments();
      } else {
        alert(`Payment failed: ${data.error || 'Unknown error'}`);
        console.error('Payment error:', data.error);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='cover w-full flex justify-center items-center relative h-[35vh] overflow-hidden'>
        <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/10335958/8229427e69bc488d96318de591e9dc5b/eyJ3IjoxMjAwLCJ3ZSI6MX0%3D/2.png?token-hash=iuDBmQEOt4uf1ASWaNznDXbVLqOZX7TQzFozf8e9D8Y%3D&token-time=1762214400" alt="" className=''/>
      </div>
      <div className='bg-white rounded-xl top-[34%] left-[46%] size-25 absolute'>
        <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/10335958/3071c31afc744723921952dcae3dfa10/eyJoIjozNjAsInciOjM2MH0%3D/2.png?token-hash=pwYfZvo-MhBMTVf2X2qKUJRtCZw3mBhT08ciB41yf5M%3D&token-time=1760659200" alt="" />
      </div>
      <div className="info text-white flex flex-col justify-center items-center my-10 gap-1.5">
        <div className='font-bold text-lg'>
          @{params.username}
        </div>
        <div className='text-slate-300'>
          Creating animation for curious space adventurers!
        </div>
        <div className='text-slate-300'>
          9,712 members . 82 posts . $15,450 release
        </div>
        <div className="payment flex gap-3 w-[80%] mt-5">
          <div className="supporters w-1/2 bg-slate-900 text-white rounded-lg p-7">
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className='flex flex-col gap-6'>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <li key={payment._id || index} className='flex items-center gap-2.5'>
                    <img src="icons8-profile.gif" alt="" className='rounded-full w-[28px]'/>
                    <span className='text-sm'>
                      {payment.name} donated <span className='font-bold text-blue-400 text-base'>${payment.amount}</span> with a message "{payment.message}"
                    </span>
                  </li>
                ))
              ) : (
                <li className='text-slate-400 text-sm'>No supporters yet. Be the first!</li>
              )}
            </ul>
          </div>
          <div className="makePayment w-1/2 bg-slate-900 text-white rounded-lg p-7">
            <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder='Enter Name' 
                  className='w-full p-2 rounded-lg bg-slate-800'
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input 
                  type="text" 
                  name="message" 
                  id="message" 
                  placeholder='Enter Message' 
                  className='w-full p-2 rounded-lg bg-slate-800'
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              <input 
                type="text" 
                name="amount"
                className="w-full p-2 rounded-lg bg-slate-800" 
                placeholder='Enter Amount'
                value={formData.amount}
                onChange={handleInputChange}
              />
              <button 
                onClick={handlePayment} 
                disabled={loading}
                className='p-2 m-2 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-bl font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer hover:bg-slate-950 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? 'Processing...' : 'Pay'}
              </button>
            </div>
            <div className='py-4'>
              <p className='text-xl font-bold'>Choose your Brew ☕</p>
              <div className='flex justify-between pt-3.5'>
                <button 
                  onClick={() => handleBrewClick(5)}
                  className='flex flex-col items-center bg-stone-900 p-2 rounded-xl text-sm cursor-pointer hover:bg-stone-800'
                >
                  <img src="icons8-espresso-50.png" alt="" />
                  <p className='-mt-1'>Espresso</p>
                  <p>$5</p>
                </button>
                <button 
                  onClick={() => handleBrewClick(10)}
                  className='flex flex-col items-center bg-stone-900 p-2 rounded-xl text-sm cursor-pointer hover:bg-stone-800'
                >
                  <img src="icons8-cappuccino-64.png" alt="" className='size-12'/>
                  <p>Cappuccino</p>
                  <p>$10</p>
                </button>
                <button 
                  onClick={() => handleBrewClick(20)}
                  className='flex flex-col items-center bg-stone-900 p-2 rounded-xl text-sm cursor-pointer hover:bg-stone-800'
                >
                  <img src="icons8-latte-64.png" alt="" className='size-12'/>
                  <p>Latte</p>
                  <p>$20</p>
                </button>
                <button 
                  onClick={() => handleBrewClick(30)}
                  className='flex flex-col items-center bg-stone-900 p-2 rounded-xl text-sm cursor-pointer hover:bg-stone-800'
                >
                  <img src="icons8-mocha-64.png" alt="" className='size-12'/>
                  <p>Mocha</p>
                  <p>$30</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Username;
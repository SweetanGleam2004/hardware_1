import React, { useState } from 'react';
import { X, Mail, Phone } from 'lucide-react';
import OtpInput from 'react-otp-input';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'input') {
      // Simulate OTP sending
      toast.success(`OTP sent to ${loginMethod === 'phone' ? phoneNumber : email}`);
      setStep('otp');
    } else {
      // Simulate login
      if (otp.length === 6) {
        const mockUser = {
          id: '1',
          name: 'Test User',
          email: email || 'test@example.com',
          phone: phoneNumber || '1234567890',
          isBusinessAccount: false,
        };
        login(mockUser);
        toast.success('Login successful!');
        onClose();
      } else {
        toast.error('Please enter a valid OTP');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-navy-900">Login</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 'input' ? (
            <>
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    loginMethod === 'phone'
                      ? 'bg-navy-900 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Phone className="h-5 w-5" />
                  Phone
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    loginMethod === 'email'
                      ? 'bg-navy-900 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Mail className="h-5 w-5" />
                  Email
                </button>
              </div>

              {loginMethod === 'phone' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
                    required
                  />
                </div>
              )}
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Enter OTP sent to {loginMethod === 'phone' ? phoneNumber : email}
              </label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-12 h-12 text-center border rounded-lg mx-1 focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setStep('input')}
                className="mt-4 text-navy-900 text-sm hover:underline"
              >
                Change {loginMethod}?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-navy-900 text-white py-3 rounded-lg hover:bg-navy-800 transition-colors"
          >
            {step === 'input' ? 'Continue' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}
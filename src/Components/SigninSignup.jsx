import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    username: '',
    confirm_password: '',
    user_type: 'CUSTOMER' // Default value for user_type
  });
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isResendButtonActive, setIsResendButtonActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const startResendTimer = () => {
    setIsResendButtonActive(false);
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setIsResendButtonActive(true);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e) => {
    setFormData({ ...formData, user_type: e.target.value });
  };

  const handleSignupClick = () => {
    setIsSignup(true);
    setIsForgotPassword(false);
  };

  const handleLoginClick = () => {
    setIsSignup(false);
    setIsForgotPassword(false);
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
    setIsSignup(false);
  };

  const handleSubmitVerificationCode = async () => {
    try {
      const response = await axios.post('https://evee-backend.vercel.app/reset_password/verify', {
        email: formData.email,
        verification_code: verificationCode,
      });
      toast.success('Verification successful');
      if (isForgotPassword) {
        setIsVerificationModalOpen(false);
        setIsResetPasswordModalOpen(true);
      } else {
        setIsVerificationModalOpen(false);
        navigate('/'); // Redirect or handle accordingly after successful verification
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid verification code!';
      toast.error(errorMessage);
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post('https://evee-backend.vercel.app/get_vcode', { email: formData.email });
      toast.success('Verification code resent!');
      startResendTimer();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error resending verification code!';
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (isSignup) {
      if (formData.password !== formData.confirm_password) {
        toast.error("Passwords do not match!");
        setLoading(false); // Stop loading
        return;
      }
      await handleSignup();
    } else if (isForgotPassword) {
      await handleForgotPassword();
    } else {
      await handleLogin();
    }

    setLoading(false); // Stop loading
  };

  const handleSignup = async () => {
    try {
      await axios.post('https://evee-backend.vercel.app/signup', formData);
      toast.success('Signup successful! Check your email for the verification code.');
      setIsVerificationModalOpen(true);
      startResendTimer();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'EError signing up!';
      toast.error(errorMessage);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await axios.post('https://evee-backend.vercel.app/get_vcode', { email: formData.email });
      toast.success('Verification code sent!');
      setIsVerificationModalOpen(true);
      startResendTimer();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error sending verification code!';
      toast.error(errorMessage);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://evee-backend.vercel.app/login', {
        email: formData.email,
        password: formData.password,
      });
      toast.success('Login successful');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      // Check if the error response is available
      const errorMessage = err.response?.data?.message || 'Error logging in!';
      toast.error(errorMessage);
    }
  };

  const handleResetPasswordSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!isValidPassword(newPassword)) {
      toast.error("Password does not meet criteria!");
      return;
    }

    try {
      await axios.post('https://evee-backend.vercel.app/reset_password/update', {
        email: formData.email,
        password: newPassword,
      });
      toast.success('Password reset successful!');
      setIsResetPasswordModalOpen(false);
      setIsForgotPassword(false);
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error resetting password!';
      toast.error(errorMessage);
    }
  };

  const isFormValid = () => {
    if (isSignup) {
      return formData.email && formData.password && formData.full_name && formData.username && formData.confirm_password && formData.user_type;
    } else if (isForgotPassword) {
      return formData.email;
    } else {
      return formData.email && formData.password;
    }
  };

  const isValidPassword = (password) => {
    const hasNumber = /\d/;
    const hasLetter = /[A-Za-z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= 8 && hasNumber.test(password) && hasLetter.test(password) && hasSpecialChar.test(password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={`w-1/2 p-5 rounded-lg ${isSignup || isForgotPassword ? 'bg-gradient-to-b from-green-500 to-green-700' : 'bg-gradient-to-b from-blue-500 to-blue-900'}`}>
        <div className="grid grid-cols-3 gap-4 h-96">
          <div className="col-span-1 flex flex-col justify-center items-center text-white text-center">
            <h2 className="text-3xl mb-5">Hello!</h2>
            <button className={`${isSignup || isForgotPassword ? 'hidden' : 'block'} mb-5 px-4 py-2 bg-white text-black rounded-md`} onClick={handleSignupClick}>Sign up</button>
            <button className={`${isSignup || isForgotPassword ? 'block' : 'hidden'} mb-5 px-4 py-2 bg-white text-black rounded-md`} onClick={handleLoginClick}>Login</button>
          </div>
          <div className="col-span-2 bg-white p-4 rounded-lg">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <h1 className="text-2xl mb-3">{isSignup ? 'Sign Up Form' : isForgotPassword ? 'Forgot Password' : 'Login Form'}</h1>
              {isSignup && (
                <>
                  <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} autoComplete="off" className="mb-2 px-4 py-2 border rounded-md w-full" />
                  <div className='flex w-full gap-2'>
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} autoComplete="off" className="mb-2 px-4 py-2 border rounded-md w-1/2" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} autoComplete="off" className="mb-2 px-4 py-2 border rounded-md w-full" />
                  </div>
                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="off" className="mb-2 px-4 py-2 border rounded-md w-full" />
                  <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} autoComplete="off" className="mb-2 px-4 py-2 border rounded-md w-full" />
                  <div className="mb-2 w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
                    <div className="flex justify-between">
                      <label className="flex items-center text-sm">
                        <input type="radio" name="user_type" value="COSTUMER" checked={formData.user_type === 'COSTUMER'} onChange={handleUserTypeChange} />
                        <span className="ml-2">Customer</span>
                      </label>
                      <label className="flex items-center text-sm">
                        <input type="radio" name="user_type" value="DEVELOPER" checked={formData.user_type === 'DEVELOPER'} onChange={handleUserTypeChange} />
                        <span className="ml-2">Developer</span>
                      </label>
                      <label className="flex items-center text-sm">
                        <input type="radio" name="user_type" value="COMPANY" checked={formData.user_type === 'COMPANY'} onChange={handleUserTypeChange} />
                        <span className="ml-2">Company</span>
                      </label>
                    </div>
                  </div>
                </>
              )}
              {isForgotPassword && (
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} autoComplete="off" className="mb-2 px-4 py-2 border rounded-md w-full" />
              )}
              {!isSignup && !isForgotPassword && (
                <>
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} autoComplete="off" className="mb-2 px-4 py-2 border rounded-md w-full" />
                  <div className="relative w-full mb-2">
                    <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="off" className="px-4 py-2 border rounded-md w-full" />
                    <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-2 text-gray-600 focus:outline-none">
                      {passwordVisible ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <button type="button" className="text-sm text-blue-500 hover:underline" onClick={handleForgotPasswordClick}>
                    Forgot Password?
                  </button>
                </>
              )}
              <button type="submit" disabled={!isFormValid() || loading} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full">
                {loading ? 'Processing...' : isSignup ? 'Sign Up' : isForgotPassword ? 'Reset Password' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
      {isVerificationModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg mb-4">Enter Verification Code</h2>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mb-4 px-4 py-2 border rounded-md w-full"
            />
            <button onClick={handleSubmitVerificationCode} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 w-full">
              Submit
            </button>
            <button onClick={handleResendCode} disabled={!isResendButtonActive} className="text-blue-500 hover:underline w-full">
              {isResendButtonActive ? 'Resend Code' : `Resend in ${resendTimer} seconds`}
            </button>
          </div>
        </div>
      )}
      {isResetPasswordModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg mb-4">Reset Password</h2>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="mb-4 px-4 py-2 border rounded-md w-full"
            />
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="mb-4 px-4 py-2 border rounded-md w-full"
            />
            <button onClick={handleResetPasswordSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

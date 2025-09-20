import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 3D animation variants
  const cardVariants = {
    initial: { 
      rotateY: -15, 
      rotateX: 10, 
      z: -50,
      opacity: 0 
    },
    animate: { 
      rotateY: 0, 
      rotateX: 0, 
      z: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      rotateY: 2,
      rotateX: -2,
      z: 20,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      y: -2,
      boxShadow: "0 8px 25px rgba(99, 102, 241, 0.15)",
      transition: {
        duration: 0.2
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98,
      y: 0
    }
  };

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, -10, 0],
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage (mock authentication)
      const userData = {
        email: formData?.email,
        name: formData?.email?.split('@')?.[0] || 'User',
        loginTime: new Date()?.toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Navigate to dashboard
      navigate('/user-dashboard');
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      {[...Array(6)]?.map((_, i) => (
        <motion.div
          key={i}
          variants={particleVariants}
          animate="animate"
          className={`absolute w-2 h-2 bg-primary/20 rounded-full`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
      <div className="w-full max-w-md">
        {/* 3D Logo */}
        <motion.div 
          className="text-center mb-8"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-xl mb-4">
            <Icon name="GraduationCap" size={32} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Skill Mentorix</h1>
          <p className="text-text-secondary">Your Learning Journey Continues</p>
        </motion.div>

        {/* Login Form Card */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="bg-surface/80 backdrop-blur-sm border border-border rounded-2xl shadow-2xl p-8"
          style={{ 
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome Back!</h2>
              <p className="text-text-secondary">Sign in to continue your learning</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <motion.div variants={inputVariants} whileFocus="focus">
                <Input
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  error={errors?.email}
                  required
                  className="transition-all duration-200"
                />
              </motion.div>

              {/* Password Input */}
              <motion.div variants={inputVariants} whileFocus="focus">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={formData?.password}
                    onChange={handleInputChange}
                    error={errors?.password}
                    required
                    className="transition-all duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
                  </button>
                </div>
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData?.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border border-input text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  <span className="text-sm text-text-secondary">Remember me</span>
                </label>
                
                <Link 
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error Message */}
              {errors?.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm flex items-center"
                >
                  <Icon name="AlertCircle" size={16} className="mr-2" />
                  {errors?.submit}
                </motion.div>
              )}

              {/* Login Button */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
                  size="lg"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-text-secondary">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Google', icon: 'Chrome', color: 'hover:bg-red-50 hover:text-red-600' },
                { name: 'GitHub', icon: 'Github', color: 'hover:bg-gray-50 hover:text-gray-900' },
                { name: 'Apple', icon: 'Apple', color: 'hover:bg-gray-50 hover:text-gray-900' }
              ]?.map((social) => (
                <motion.button
                  key={social?.name}
                  type="button"
                  onClick={() => handleSocialLogin(social?.name)}
                  className={`flex items-center justify-center p-3 border border-border rounded-lg transition-all duration-200 ${social?.color}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name={social?.icon} size={20} />
                </motion.button>
              ))}
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-text-secondary">
                Don't have an account?{' '}
                <Link 
                  to="/register-screen"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;
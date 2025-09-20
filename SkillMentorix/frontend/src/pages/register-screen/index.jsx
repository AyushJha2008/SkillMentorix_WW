import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 3D animation variants
  const cardVariants = {
    initial: { 
      rotateY: 15, 
      rotateX: -10, 
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
      rotateY: -2,
      rotateX: 2,
      z: 20,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: 180 },
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
      rotate: -10,
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
      boxShadow: "0 8px 25px rgba(16, 185, 129, 0.15)",
      transition: {
        duration: 0.2
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98,
      y: 0
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
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

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData?.confirmPassword?.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage (mock registration)
      const userData = {
        email: formData?.email,
        name: `${formData?.firstName} ${formData?.lastName}`,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        registrationDate: new Date()?.toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Navigate to dashboard
      navigate('/user-dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Register with ${provider}`);
    // Implement social registration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      {[...Array(8)]?.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 15, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.3
          }}
          className={`absolute w-3 h-3 bg-success/30 rounded-full`}
          style={{
            left: `${15 + i * 12}%`,
            top: `${8 + i * 8}%`,
          }}
        />
      ))}
      <div className="w-full max-w-lg">
        {/* 3D Logo */}
        <motion.div 
          className="text-center mb-8"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-2xl shadow-xl mb-4">
            <Icon name="UserPlus" size={32} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Join Skill Mentorix</h1>
          <p className="text-text-secondary">Start your learning adventure today</p>
        </motion.div>

        {/* Registration Form Card */}
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
              <h2 className="text-2xl font-bold text-text-primary mb-2">Create Account</h2>
              <p className="text-text-secondary">Join thousands of learners worldwide</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={inputVariants} whileFocus="focus">
                  <Input
                    type="text"
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    value={formData?.firstName}
                    onChange={handleInputChange}
                    error={errors?.firstName}
                    required
                    className="transition-all duration-200"
                  />
                </motion.div>
                
                <motion.div variants={inputVariants} whileFocus="focus">
                  <Input
                    type="text"
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    value={formData?.lastName}
                    onChange={handleInputChange}
                    error={errors?.lastName}
                    required
                    className="transition-all duration-200"
                  />
                </motion.div>
              </div>

              {/* Email Input */}
              <motion.div variants={inputVariants} whileFocus="focus">
                <Input
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="john.doe@example.com"
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
                    placeholder="Create a strong password"
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

              {/* Confirm Password Input */}
              <motion.div variants={inputVariants} whileFocus="focus">
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData?.confirmPassword}
                    onChange={handleInputChange}
                    error={errors?.confirmPassword}
                    required
                    className="transition-all duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
                  </button>
                </div>
              </motion.div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData?.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 mt-1 rounded border border-input text-success focus:ring-2 focus:ring-success focus:ring-offset-2"
                />
                <div className="flex-1">
                  <label className="text-sm text-text-secondary cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:text-primary/80 underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:text-primary/80 underline">
                      Privacy Policy
                    </Link>
                  </label>
                  {errors?.agreeToTerms && (
                    <p className="text-sm text-error mt-1">{errors?.agreeToTerms}</p>
                  )}
                </div>
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

              {/* Register Button */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-success to-success/90 hover:from-success/90 hover:to-success/80"
                  size="lg"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-text-secondary">Or sign up with</span>
              </div>
            </div>

            {/* Social Registration */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Google', icon: 'Chrome', color: 'hover:bg-red-50 hover:text-red-600' },
                { name: 'GitHub', icon: 'Github', color: 'hover:bg-gray-50 hover:text-gray-900' },
                { name: 'LinkedIn', icon: 'Linkedin', color: 'hover:bg-blue-50 hover:text-blue-600' }
              ]?.map((social) => (
                <motion.button
                  key={social?.name}
                  type="button"
                  onClick={() => handleSocialRegister(social?.name)}
                  className={`flex items-center justify-center p-3 border border-border rounded-lg transition-all duration-200 ${social?.color}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name={social?.icon} size={20} />
                </motion.button>
              ))}
            </div>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-text-secondary">
                Already have an account?{' '}
                <Link 
                  to="/login-screen"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterScreen;
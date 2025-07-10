import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  Lock, 
  Smartphone, 
  ArrowRight,
  CheckCircle,
  Play,
  Star
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useTheme } from '../contexts/ThemeContext';
import { ROUTES } from '../utils/constants';

export const LandingPage: React.FC = () => {
  const { theme } = useTheme();
  
  const features = [
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Military-grade encryption and multi-factor authentication protect your home.',
    },
    {
      icon: Eye,
      title: 'Smart Monitoring',
      description: 'AI-powered cameras with real-time alerts and motion detection.',
    },
    {
      icon: Lock,
      title: 'Smart Access Control',
      description: 'Secure digital locks with remote access and visitor management.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Control',
      description: 'Complete control of your smart home from anywhere in the world.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'TrueGate has given me complete peace of mind. The interface is intuitive and the security features are top-notch.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Tech Professional',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'As someone in tech, I appreciate the robust API and the attention to security details. Highly recommended.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Working Parent',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'The real-time alerts help me keep track of my kids getting home safely. Love the mobile app!',
      rating: 5,
    },
  ];

  // Theme-aware styles
  const bgStyles = theme === 'dark' 
    ? 'bg-gradient-to-br from-dark-bg via-dark-bg-secondary to-dark-bg' 
    : 'bg-gradient-to-br from-light-bg via-light-bg-secondary to-light-bg';
  
  const textStyles = theme === 'dark' ? 'text-dark-text' : 'text-light-text';
  const textMutedStyles = theme === 'dark' ? 'text-dark-text-muted' : 'text-light-text-muted';
  const textSecondaryStyles = theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary';
  const borderStyles = theme === 'dark' ? 'border-dark-border-secondary' : 'border-light-border-secondary';
  const navBgStyles = theme === 'dark' ? 'glass-dark border-dark-border-secondary' : 'glass border-light-border-secondary';

  return (
    <div className={`min-h-screen ${bgStyles}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${navBgStyles} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-accent-500" />
              <h1 className={`text-xl font-bold ${textStyles}`}>TrueGate</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to={ROUTES.LOGIN}
                className={`${textSecondaryStyles} hover:${textStyles} transition-colors`}
              >
                Sign In
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`text-5xl lg:text-6xl font-bold ${textStyles} mb-6 leading-tight`}>
                Secure Your
                <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
                  {' '}Smart Home
                </span>
              </h1>
              <p className={`text-xl ${textSecondaryStyles} mb-8 leading-relaxed`}>
                Experience next-generation home security with AI-powered monitoring, 
                smart access control, and real-time alerts. Your home, protected by intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={ROUTES.REGISTER}>
                  <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Start Free Trial
                  </Button>
                </Link>
                <Button variant="ghost" size="lg" icon={<Play className="w-5 h-5" />}>
                  Watch Demo
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className={`flex items-center space-x-6 mt-8 pt-8 border-t ${borderStyles}`}>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${textStyles}`}>2</div>
                  <div className={`${textMutedStyles} text-sm`}>Homes Protected</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${textStyles}`}>99.9%</div>
                  <div className={`${textMutedStyles} text-sm`}>Uptime</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${textStyles}`}>24/7</div>
                  <div className={`${textMutedStyles} text-sm`}>Monitoring</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <Card className="p-8" glass>
                  <img
                    src="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Smart Home Security Dashboard"
                    className="rounded-lg shadow-2xl"
                  />
                </Card>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-success-500 p-3 rounded-full shadow-lg"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-accent-500 p-3 rounded-full shadow-lg"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold ${textStyles} mb-4`}>
              Everything You Need for Home Security
            </h2>
            <p className={`text-xl ${textMutedStyles} max-w-3xl mx-auto`}>
              Our comprehensive platform combines cutting-edge technology with intuitive design 
              to deliver unparalleled home security solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full" hover>
                  <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-accent-400" />
                  </div>
                  <h3 className={`text-xl font-semibold ${textStyles} mb-3`}>
                    {feature.title}
                  </h3>
                  <p className={`${textMutedStyles} leading-relaxed`}>
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-dark-bg-secondary/50' : 'bg-light-bg-secondary/50'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold ${textStyles} mb-4`}>
              Trusted by Thousands of Families
            </h2>
            <p className={`text-xl ${textMutedStyles}`}>
              See what our customers say about their TrueGate experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warning-400 fill-current" />
                    ))}
                  </div>
                  <p className={`${textSecondaryStyles} mb-6 leading-relaxed`}>
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className={`${textStyles} font-semibold`}>
                        {testimonial.name}
                      </div>
                      <div className={`${textMutedStyles} text-sm`}>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-12" glass>
              <h2 className={`text-4xl font-bold ${textStyles} mb-4`}>
                Ready to Secure Your Home?
              </h2>
              <p className={`text-xl ${textSecondaryStyles} mb-8`}>
                Join thousands of satisfied customers and experience the future of home security today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={ROUTES.REGISTER}>
                  <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Get Started Free
                  </Button>
                </Link>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${borderStyles} py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-accent-500" />
              <span className={`${textStyles} font-semibold`}>TrueGate</span>
            </div>
            <div className={`${textMutedStyles} text-sm`}>
              © 2025 TrueGate. All rights reserved. Securing homes, protecting families.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
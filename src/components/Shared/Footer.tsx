
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
 
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Website Info */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">👉InterviewNinja</h3>
            <p className="text-gray-400">Prepare for your next web developer interview with curated questions and answers by category.</p>
            <div className="flex space-x-4">
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook"></i>
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/html" className="text-gray-400 hover:text-white transition-colors">HTML</Link></li>
              <li><Link to="/categories/css" className="text-gray-400 hover:text-white transition-colors">CSS</Link></li>
              <li><Link to="/categories/javascript" className="text-gray-400 hover:text-white transition-colors">JavaScript</Link></li>
              <li><Link to="/categories/react" className="text-gray-400 hover:text-white transition-colors">React</Link></li>
              <li><Link to="/categories/node" className="text-gray-400 hover:text-white transition-colors">Node.js</Link></li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-gray-400">Get weekly interview tips and coding questions straight to your inbox</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} 👉InterviewNinja. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
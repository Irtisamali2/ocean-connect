'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { contactInfo } from '@/lib/contact-info';

export default function WhatsAppButton() {
  return (
    <motion.a
      href={contactInfo.general.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle style={{ width: 24, height: 24 }} />
    </motion.a>
  );
}

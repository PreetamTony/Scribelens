import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, children, ...props }, ref) => {
    const baseStyles = "bg-white rounded-xl border border-gray-200";
    const hoverStyles = hover ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1" : "";

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, hoverStyles, className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
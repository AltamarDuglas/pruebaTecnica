import React from 'react';
import { motion, Variants } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
    icon: LucideIcon;
    size?: number | string;
    className?: string;
    color?: string;
}

const defaultVariants: Variants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
        scale: 1.1,
        rotate: -10,
        transition: { type: "spring", stiffness: 300, damping: 10 }
    }
};

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ icon: Icon, size, className, color }) => {
    return (
        <motion.div
            variants={defaultVariants}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center"
        >
            <Icon size={size} className={className} color={color} />
        </motion.div>
    );
};

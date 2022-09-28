/*eslint-disable */

import React from 'react'
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'
import { children } from 'react';
const animationConfiguration = {
    initial: { opacity: 0, x : 100 },
    animate: { opacity: 1 , x : 0},
    exit: { opacity: 0, x : -100 },
};

const Transitions = ({ children }) => {
    return (
        <motion.div
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.7 }}
        >
            {children}
        </motion.div>
    );
};
export default Transitions;
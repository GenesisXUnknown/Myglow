import { motion } from 'framer-motion'

/**
 * Button Component
 */
export const Button = ({ children, variant = 'primary', onClick, disabled, className = '', ...props }) => {
  const baseClasses = 'font-semibold px-6 py-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    secondary: 'bg-gradient-to-r from-secondary-400 to-secondary-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    outline: 'border-2 border-primary-400 text-primary-600 hover:bg-primary-50',
    ghost: 'text-primary-600 hover:bg-primary-50'
  }

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}

/**
 * Card Component
 */
export const Card = ({ children, className = '', glass = false, onClick, ...props }) => {
  const baseClasses = 'rounded-2xl p-6 transition-all duration-300'
  const glassClasses = glass
    ? 'bg-white/80 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl'
    : 'bg-white shadow-md hover:shadow-lg'

  const Component = onClick ? motion.div : 'div'
  const motionProps = onClick ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  } : {}

  return (
    <Component
      className={`${baseClasses} ${glassClasses} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * ColorSwatch Component
 */
export const ColorSwatch = ({ color, name, selected, onClick, size = 'md' }) => {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`
          ${sizes[size]}
          rounded-full
          shadow-lg
          border-4
          ${selected ? 'border-primary-500' : 'border-white'}
          transition-all duration-300
        `}
        style={{ backgroundColor: color }}
      />
      {name && (
        <span className="text-xs text-gray-600 text-center max-w-[80px] truncate">
          {name}
        </span>
      )}
    </motion.div>
  )
}

/**
 * Badge Component
 */
export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-secondary-100 text-secondary-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700'
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

/**
 * IconButton Component
 */
export const IconButton = ({ children, onClick, className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full hover:bg-primary-50 text-primary-600 transition-colors ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}

/**
 * Container Component
 */
export const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

/**
 * PageHeader Component
 */
export const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-4xl font-bold gradient-text">{title}</h1>
        {action}
      </div>
      {subtitle && (
        <p className="text-gray-600 text-lg">{subtitle}</p>
      )}
    </div>
  )
}

/**
 * LoadingSpinner Component
 */
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  }

  return (
    <div
      className={`
        ${sizes[size]}
        border-primary-200
        border-t-primary-600
        rounded-full
        animate-spin
        ${className}
      `}
    />
  )
}

/**
 * EmptyState Component
 */
export const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && (
        <div className="text-6xl mb-4 text-primary-300">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      )}
      {action}
    </div>
  )
}

/**
 * Modal Component
 */
export const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold gradient-text">{title}</h2>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * ProgressBar Component
 */
export const ProgressBar = ({ progress, className = '' }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

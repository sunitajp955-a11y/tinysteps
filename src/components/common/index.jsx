export function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-calm-500 text-white hover:bg-calm-600',
    secondary: 'bg-calm-100 text-calm-900 hover:bg-calm-200',
    ghost: 'bg-transparent text-calm-900 hover:bg-calm-50 border border-calm-200',
  };

  return (
    <button
      className={`px-4 py-2 rounded transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-calm-800">{label}</label>}
      <input
        className={`px-3 py-2 border border-calm-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-calm-500 ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white border border-calm-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-calm-100 text-calm-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function Header({ title, subtitle, children, ...props }) {
  return (
    <div className="border-b border-calm-100 pb-4 mb-6" {...props}>
      <h1 className="text-2xl font-semibold text-calm-900">{title}</h1>
      {subtitle && <p className="text-sm text-calm-600 mt-1">{subtitle}</p>}
      {children}
    </div>
  );
}

export function Empty({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-calm-300 mb-4">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-calm-800">{title}</h3>
      <p className="text-sm text-calm-600 mt-2 max-w-xs text-center">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

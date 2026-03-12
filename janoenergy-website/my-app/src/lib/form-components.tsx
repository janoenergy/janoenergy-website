// 统一的后台表单组件样式
export const formStyles = {
  // 输入框基础样式 - 统一高度 44px
  input: "w-full px-4 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm",
  
  // 选择框样式 - 统一高度 44px
  select: "w-full px-4 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm bg-white appearance-none cursor-pointer",
  
  // 文本域样式
  textarea: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm resize-none",
  
  // 标签样式
  label: "block text-sm font-medium text-gray-700 mb-2",
  
  // 字段容器样式 - 统一间距
  fieldWrapper: "mb-5",
  
  // 按钮样式
  button: {
    primary: "inline-flex items-center justify-center px-4 h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all active:scale-95",
    secondary: "inline-flex items-center justify-center px-4 h-10 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-all active:scale-95",
    danger: "inline-flex items-center justify-center px-4 h-10 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all active:scale-95",
    ghost: "inline-flex items-center justify-center px-4 h-10 hover:bg-gray-100 text-gray-600 font-medium rounded-lg transition-all",
  },
  
  // 搜索框样式
  search: "w-full pl-10 pr-4 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none",
  
  // 筛选下拉样式
  filter: "px-4 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white",
};

// 统一的表单组件 - Input
export function FormInput({ label, value, onChange, type = 'text', placeholder = '', required = false }: any) {
  return (
    <div className={formStyles.fieldWrapper}>
      <label className={formStyles.label}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={formStyles.input}
      />
    </div>
  );
}

// 统一的表单组件 - Select
export function FormSelect({ label, value, onChange, options, required = false }: any) {
  return (
    <div className={formStyles.fieldWrapper}>
      <label className={formStyles.label}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={formStyles.select}
        >
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {/* 下拉箭头 */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// 统一的表单组件 - TextArea
export function FormTextArea({ label, value, onChange, rows = 4, placeholder = '' }: any) {
  return (
    <div className={formStyles.fieldWrapper}>
      <label className={formStyles.label}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={formStyles.textarea}
      />
    </div>
  );
}

// 统一的表单组件 - Button
export function FormButton({ children, onClick, variant = 'primary', disabled = false }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${formStyles.button[variant as keyof typeof formStyles.button]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

// 统一的弹窗组件
export function FormModal({ isOpen, onClose, title, children }: any) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>
  );
}

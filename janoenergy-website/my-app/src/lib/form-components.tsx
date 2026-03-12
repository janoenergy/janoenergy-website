import { typography, spacing, sizes } from './admin-theme';

// 统一的后台表单组件样式
export const formStyles = {
  // 输入框基础样式 - 统一高度 48px，字体大小 text-base
  input: `${sizes.input} w-full px-4 border border-gray-300 ${sizes.rounded} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${typography.body}`,
  
  // 选择框样式 - 统一高度 48px，字体大小 text-base
  select: `${sizes.input} w-full px-4 pr-10 border border-gray-300 ${sizes.rounded} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${typography.body} bg-white appearance-none cursor-pointer`,
  
  // 文本域样式 - 字体大小 text-base
  textarea: `w-full px-4 py-3 border border-gray-300 ${sizes.rounded} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${typography.body} resize-none`,
  
  // 标签样式 - 字体大小 text-base
  label: `${typography.label} ${spacing.label}`,
  
  // 字段容器样式 - 统一间距
  fieldWrapper: spacing.field,
  
  // 按钮样式 - 字体大小 text-base
  button: {
    primary: `${sizes.button} inline-flex items-center justify-center px-4 bg-emerald-600 hover:bg-emerald-700 text-white ${typography.button} ${sizes.rounded} transition-all active:scale-95`,
    secondary: `${sizes.button} inline-flex items-center justify-center px-4 bg-white hover:bg-gray-50 text-gray-700 ${typography.button} ${sizes.rounded} border border-gray-300 transition-all active:scale-95`,
    danger: `${sizes.button} inline-flex items-center justify-center px-4 bg-red-600 hover:bg-red-700 text-white ${typography.button} ${sizes.rounded} transition-all active:scale-95`,
    ghost: `${sizes.button} inline-flex items-center justify-center px-4 hover:bg-gray-100 text-gray-600 ${typography.button} ${sizes.rounded} transition-all`,
  },
  
  // 搜索框样式 - 字体大小 text-base
  search: `${sizes.input} w-full pl-10 pr-4 border border-gray-300 ${sizes.rounded} focus:ring-2 focus:ring-emerald-500 outline-none ${typography.body}`,
  
  // 筛选下拉样式 - 字体大小 text-base
  filter: `px-4 ${sizes.input} pr-10 border border-gray-300 ${sizes.rounded} focus:ring-2 focus:ring-emerald-500 outline-none bg-white ${typography.body}`,
  
  // 辅助文字样式
  helper: `${typography.helper} mt-1`,
  
  // 占位符样式
  placeholder: "placeholder-gray-400",
};

// 统一的表单组件 - Input
export function FormInput({ label, value, onChange, type = 'text', placeholder = '', required = false, helper }: any) {
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
        className={`${formStyles.input} ${formStyles.placeholder}`}
      />
      {helper && <p className={formStyles.helper}>{helper}</p>}
    </div>
  );
}

// 统一的表单组件 - Select（带箭头）
export function FormSelect({ label, value, onChange, options, required = false, helper }: any) {
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
        {/* 下拉箭头 - 固定在右侧 */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {helper && <p className={formStyles.helper}>{helper}</p>}
    </div>
  );
}

// 统一的表单组件 - TextArea
export function FormTextArea({ label, value, onChange, rows = 4, placeholder = '', helper }: any) {
  return (
    <div className={formStyles.fieldWrapper}>
      <label className={formStyles.label}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={`${formStyles.textarea} ${formStyles.placeholder}`}
      />
      {helper && <p className={formStyles.helper}>{helper}</p>}
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

// 统一的弹窗组件 - 优化高度和滚动
export function FormModal({ isOpen, onClose, title, children }: any) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <h3 className={`${typography.sectionTitle}`}>{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content - 可滚动 */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// 导出主题配置供其他组件使用
export { typography, spacing, sizes };

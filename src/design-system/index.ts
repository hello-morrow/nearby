// Design System - Nearby
// 完整的设计系统规范

// Colors - 颜色系统
export * from './colors'

// Typography - 字体系统
export * from './typography'

// Spacing - 间距系统
export * from './spacing'

// Radius - 圆角系统
export * from './radius'

// Animation - 动画系统
export * from './animation'

// Shadow - 阴影系统
export * from './shadow'

// Icon - 图标系统
export * from './icon'

// 设计系统版本
export const version = '1.0.0'

// 设计系统配置
export const config = {
  // 颜色模式
  colorMode: 'light',
  
  // 默认字体
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, Consolas, Monaco, monospace',
  },
  
  // 基础设置
  base: {
    fontSize: '16px',
    lineHeight: '1.5',
    borderRadius: '0.375rem',
  },
  
  // 断点系统
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-Index 层级
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070,
  },
} as const
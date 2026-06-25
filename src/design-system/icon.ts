export const icon = {
  // 统一图标尺寸规范
  // 基于 8pt Grid 的图标尺寸系统
  
  // 小图标
  sm: {
    size: '16px',    // 16px
    width: 16,
    height: 16,
  },
  
  // 中等图标
  md: {
    size: '20px',    // 20px
    width: 20,
    height: 20,
  },
  
  // 标准图标
  lg: {
    size: '24px',    // 24px
    width: 24,
    height: 24,
  },
  
  // 大图标
  xl: {
    size: '32px',    // 32px
    width: 32,
    height: 32,
  },
  
  // 图标尺寸映射
  sizes: {
    16: {
      size: '16px',
      width: 16,
      height: 16,
    },
    20: {
      size: '20px',
      width: 20,
      height: 20,
    },
    24: {
      size: '24px',
      width: 24,
      height: 24,
    },
    32: {
      size: '32px',
      width: 32,
      height: 32,
    },
  },
  
  // 图标使用场景建议
  usage: {
    sm: {
      description: '小图标，用于导航栏、标签页、按钮内图标',
      examples: ['menu', 'close', 'search', 'user'],
    },
    md: {
      description: '中等图标，用于表单、卡片、工具栏',
      examples: ['edit', 'delete', 'save', 'cancel'],
    },
    lg: {
      description: '标准图标，用于主要内容、操作按钮',
      examples: ['upload', 'download', 'share', 'settings'],
    },
    xl: {
      description: '大图标，用于标题、重要操作、独立展示',
      examples: ['logo', 'hero', 'featured', 'main'],
    },
  },
} as const
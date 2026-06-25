export const typography = {
  // Display - 大标题显示
  display: {
    fontSize: {
      '1': '3.875rem',  // 62px
      '2': '3.25rem',  // 52px
      '3': '2.75rem',  // 44px
      '4': '2.25rem',  // 36px
    },
    lineHeight: {
      '1': '1.15',
      '2': '1.2',
      '3': '1.25',
      '4': '1.3',
    },
    fontWeight: {
      '1': 100,  // Thin
      '2': 200,  // Extra Light
      '3': 300,  // Light
    },
  },
  
  // Title - 页面主标题
  title: {
    fontSize: {
      '1': '2.25rem',  // 36px
      '2': '1.875rem', // 30px
      '3': '1.5rem',   // 24px
      '4': '1.25rem',  // 20px
    },
    lineHeight: {
      '1': '1.2',
      '2': '1.25',
      '3': '1.3',
      '4': '1.35',
    },
    fontWeight: {
      '1': 300,  // Light
      '2': 400,  // Normal
      '3': 500,  // Medium
      '4': 600,  // Semi Bold
    },
  },
  
  // Heading - 章节标题
  heading: {
    fontSize: {
      '1': '1.5rem',   // 24px
      '2': '1.25rem',  // 20px
      '3': '1.125rem', // 18px
      '4': '1rem',     // 16px
    },
    lineHeight: {
      '1': '1.3',
      '2': '1.35',
      '3': '1.4',
      '4': '1.45',
    },
    fontWeight: {
      '1': 600,  // Semi Bold
      '2': 700,  // Bold
      '3': 800,  // Extra Bold
      '4': 900,  // Black
    },
  },
  
  // Body - 正文内容
  body: {
    fontSize: {
      '1': '1.125rem', // 18px
      '2': '1rem',     // 16px
      '3': '0.875rem', // 14px
      '4': '0.75rem',  // 12px
    },
    lineHeight: {
      '1': '1.5',
      '2': '1.6',
      '3': '1.7',
      '4': '1.8',
    },
    fontWeight: {
      '1': 300,  // Light
      '2': 400,  // Normal
      '3': 500,  // Medium
      '4': 600,  // Semi Bold
    },
  },
  
  // Caption - 说明文字
  caption: {
    fontSize: {
      '1': '0.875rem', // 14px
      '2': '0.75rem',  // 12px
      '3': '0.625rem', // 10px
    },
    lineHeight: {
      '1': '1.4',
      '2': '1.5',
      '3': '1.6',
    },
    fontWeight: {
      '1': 400,  // Normal
      '2': 500,  // Medium
      '3': 600,  // Semi Bold
    },
  },
  
  // Button - 按钮文字
  button: {
    fontSize: {
      '1': '1rem',     // 16px
      '2': '0.875rem', // 14px
      '3': '0.75rem',  // 12px
    },
    lineHeight: {
      '1': '1.25',
      '2': '1.3',
      '3': '1.35',
    },
    fontWeight: {
      '1': 500,  // Medium
      '2': 600,  // Semi Bold
      '3': 700,  // Bold
    },
  },
} as const
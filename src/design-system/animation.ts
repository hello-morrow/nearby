export const animation = {
  // Duration - 动画持续时间
  duration: {
    fast: '150ms',     // 快速动画
    normal: '300ms',   // 正常动画
    slow: '500ms',     // 慢速动画
    slower: '700ms',   // 更慢的动画
  },
  
  // Easing - 缓动函数
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    // 自定义缓动函数
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
  
  // Opacity - 透明度动画
  opacity: {
    none: '0',
    low: '0.2',
    medium: '0.5',
    high: '0.8',
    full: '1',
  },
  
  // Translate - 位移动画
  translate: {
    none: 'translate(0, 0)',
    smallX: 'translateX(4px)',
    mediumX: 'translateX(8px)',
    largeX: 'translateX(16px)',
    smallY: 'translateY(4px)',
    mediumY: 'translateY(8px)',
    largeY: 'translateY(16px)',
    smallXY: 'translate(4px, 4px)',
    mediumXY: 'translate(8px, 8px)',
    largeXY: 'translate(16px, 16px)',
  },
  
  // 预定义动画组合
  presets: {
    // 淡入动画
    fadeIn: {
      duration: '300ms',
      easing: 'ease-out',
      opacity: '1',
    },
    
    // 淡出动画
    fadeOut: {
      duration: '200ms',
      easing: 'ease-in',
      opacity: '0',
    },
    
    // 滑入动画
    slideIn: {
      duration: '300ms',
      easing: 'ease-out',
      translate: 'translateX(0)',
    },
    
    // 滑出动画
    slideOut: {
      duration: '200ms',
      easing: 'ease-in',
      translate: 'translateX(-100%)',
    },
    
    // 缩放动画
    scaleIn: {
      duration: '200ms',
      easing: 'ease-out',
    },
    
    // 震动动画
    shake: {
      duration: '300ms',
      easing: 'ease-in-out',
    },
  },
} as const
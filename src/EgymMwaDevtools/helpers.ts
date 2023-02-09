const getCssVariableValue = (name: string, fallback: string) => {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim();

  console.log(name, value);

  if (!value || value === '0px') return fallback;

  return value;
}

export const getPosition = (position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {

  const safeArea = {
    left: getCssVariableValue('--ion-safe-area-left', '15px'),
    right: getCssVariableValue('--ion-safe-area-right', '15px'),
    top: getCssVariableValue('--ion-safe-area-top', '15px'),
    bottom: getCssVariableValue('--ion-safe-area-bottom', '15px')
  }

  switch (position) {
    case 'top-left':
      return {
        wrapper: {
          top: 0,
          left: 0,
        },
        button: {
          top: safeArea.top,
          left: safeArea.left,
        },
        safeArea
      }
    case 'bottom-left':
      return {
        wrapper: {
          bottom: 0,
          left: 0,
        },
        button: {
          bottom: safeArea.bottom,
          left: safeArea.left,
        },
        safeArea
      }
    case 'bottom-right':
      return {
        wrapper: {
          bottom: 0,
          right: 0,
        },
        button: {
          bottom: safeArea.bottom,
          right: safeArea.right,
        },
        safeArea
      }
    case 'top-right':
    default:
      return {
        wrapper: {
          top: 0,
          right: 0,
        },
        button: {
          top: safeArea.top,
          right: safeArea.right,
        },
        safeArea
      }
  }
}
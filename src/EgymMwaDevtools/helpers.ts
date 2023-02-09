const getCssVariableValue = (name: string, fallback: string) => {
  const value = getComputedStyle(document.body).getPropertyValue(name);

  if (!value || value === '0px') return fallback;

  return value;
}

export const safeAreaLeft = getCssVariableValue('--ion-safe-area-left', '15px');
export const safeAreaRight = getCssVariableValue('--ion-safe-area-right', '15px');
export const safeAreaTop = getCssVariableValue('--ion-safe-area-top', '15px');
export const safeAreaBottom = getCssVariableValue('--ion-safe-area-bottom', '15px');

export const getPosition = (position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
  switch (position) {
    case 'top-left':
      return {
        wrapper: {
          top: 0,
          left: 0,
        },
        button: {
          top: safeAreaTop,
          left: safeAreaLeft,
        }
      }
    case 'bottom-left':
      return {
        wrapper: {
          bottom: 0,
          left: 0,
        },
        button: {
          bottom: safeAreaBottom,
          left: safeAreaLeft,
        }
      }
    case 'bottom-right':
      return {
        wrapper: {
          bottom: 0,
          right: 0,
        },
        button: {
          bottom: safeAreaBottom,
          right: safeAreaRight,
        }
      }
    case 'top-right':
    default:
      return {
        wrapper: {
          top: 0,
          right: 0,
        },
        button: {
          top: safeAreaTop,
          right: safeAreaRight,
        }
      }
  }
}
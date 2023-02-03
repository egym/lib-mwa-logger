export const getPosition = (position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
  switch (position) {
    case 'top-left':
      return {
        wrapper: {
          top: 0,
          left: 0,
        },
        button: {
          top: '15px',
          left: '15px',
        }
      }
    case 'bottom-left':
      return {
        wrapper: {
          bottom: 0,
          left: 0,
        },
        button: {
          bottom: '15px',
          left: '15px',
        }
      }
    case 'bottom-right':
      return {
        wrapper: {
          bottom: 0,
          right: 0,
        },
        button: {
          bottom: '15px',
          right: '15px',
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
          top: '15px',
          right: '15px',
        }
      }
  }
}
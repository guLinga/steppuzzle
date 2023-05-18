import { VitePluginConfig } from 'unocss/vite';
import { presetAttributify, presetWind, presetIcons } from 'unocss';

const options: VitePluginConfig = {
  presets: [presetAttributify(), presetWind({}), presetIcons()],
  shortcuts: {
    'flex-center': 'flex justify-center items-center'
  },
  theme: {
    colors: {
      brandLight: 'var(--steppuzzle-c-brand-light)',
      brandDark: 'var(--steppuzzle-c-brand-dark)',
      brand: 'var(--steppuzzle-c-brand)',
      text: {
        1: 'var(--steppuzzle-c-text-1)',
        2: 'var(--steppuzzle-c-text-2)',
        3: 'var(--steppuzzle-c-text-3)',
        4: 'var(--steppuzzle-c-text-4)'
      },
      divider: {
        default: 'var(--steppuzzle-c-divider)',
        light: 'var(--steppuzzle-c-divider-light)',
        dark: 'var(--steppuzzle-c-divider-dark)'
      },
      gray: {
        light: {
          1: 'var(--steppuzzle-c-gray-light-1)',
          2: 'var(--steppuzzle-c-gray-light-2)',
          3: 'var(--steppuzzle-c-gray-light-3)',
          4: 'var(--steppuzzle-c-gray-light-4)'
        }
      },
      bg: {
        default: 'var(--steppuzzle-c-bg)',
        soft: 'var(--steppuzzle-c-bg-soft)',
        mute: 'var(--steppuzzle-c-bg-mute)'
      }
    }
  },
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--steppuzzle-c-divider-light)'
      })
    ],
    [
      'menu-item-before',
      {
        'margin-right': '12px',
        'margin-left': '12px',
        width: '1px',
        height: '24px',
        'background-color': 'var(--steppuzzle-c-divider-light)',
        content: '" "'
      }
    ]
  ]
};

export default options;

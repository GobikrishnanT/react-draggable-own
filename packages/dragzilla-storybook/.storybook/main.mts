import { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';


const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials' , '@storybook/addon-actions'],
  framework: '@storybook/react-vite',
  core: {
    builder: '@storybook/builder-vite',
  },
  docs: {
    //👇 See the table below for the list of supported options
    defaultName: 'Documentation',
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config , {
      plugins : [react()]
    });
  },
};

export default config;

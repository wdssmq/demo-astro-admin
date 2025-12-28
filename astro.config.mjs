// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 禁用 HTML 压缩（默认 true）
  compressHTML: false,
  // 自定义构建输出（可选）
  build: {
    // 强制输出外部 CSS 文件而非内联
    inlineStylesheets: 'never',
  },
  vite: {
    // 通过 Rollup 的输出规则定制资源文件名和路径
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // `name` 已弃用，使用 `names` 或 `originalFileNames`（兼容不同 Rollup 版本）
            const originalName = (assetInfo.names && assetInfo.names[0]) || (assetInfo.originalFileNames && assetInfo.originalFileNames[0]) || '';
            const ext = originalName.split('.').pop();
            if (ext === 'css') return 'css/style.css';
            return '_astro/[name].[hash][extname]';
          }
        }
      },
      minify: false
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  }
});

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  esbuild: {
    jsxInject: `import { h } from 'vue'`,
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})

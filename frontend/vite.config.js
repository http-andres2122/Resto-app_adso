import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //configurando proxy
  server: {
    //Setup port
    port: 9005,
    //host enable for LOCAL And Remote (LAN-WAN)
    host: true,
    ///open web page auto
    open: true,
    //proxy for API BACKEND
    // proxy:{
    //   '/api': 'http://localhost:9001' 
    // }
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});

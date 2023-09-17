import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({ rollupTypes: true }),
        copy({
            hook: "writeBundle",
            targets: [
                { src: "src/choose.scss", dest: "dist" },
                { src: "src/columns.scss", dest: "dist" },
                { src: "src/dropdown.scss", dest: "dist" },
                { src: "src/field.scss", dest: "dist" },
                { src: "src/file-upload.scss", dest: "dist" },
                { src: "src/icon-toggle.scss", dest: "dist" },
                { src: "src/jalaali-picker.scss", dest: "dist" },
                { src: "src/options.scss", dest: "dist" },
                { src: "src/pagination.scss", dest: "dist" },
                { src: "src/pie.scss", dest: "dist" },
                { src: "src/simple-pagination.scss", dest: "dist" },
                { src: "src/tab.scss", dest: "dist" },
                { src: "src/tile.scss", dest: "dist" },
                { src: "src/toggle.scss", dest: "dist" },
                { src: "src/toman.scss", dest: "dist" },
            ],
        }),
    ],
    resolve: {
        preserveSymlinks: true,
    },
    build: {
        cssCodeSplit: true,
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, "src", "index.ts"),
            name: "vTermeh",
            fileName: (format) => `vtermeh.${format}.js`,
        },
        rollupOptions: {
            external: [
                "@termehui/termeh",
                "@termehui/utils",
                "@termehui/vutils",
                "masonry-layout",
                "moment-jalaali",
                "shortid",
                "vue",
                "vue3-persian-datetime-picker",
            ],
        },
    },
});

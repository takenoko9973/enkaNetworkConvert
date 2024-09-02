import { defineConfig } from "vite";
import monkey, { MonkeyUserScript } from "vite-plugin-monkey";

const github_url = "https://github.com/takenoko9973/enkaNetworkConvert";

const manifest: MonkeyUserScript = {
    "name": "Enka.Network_lang-jp_mod_by_takenoko",
    "updateURL": `${github_url}/raw/master/dist/Enka.Network_icon2text.user.js`,
    "downloadURL": `${github_url}/raw/master/dist/Enka.Network_icon2text.user.js`,
    "supportURL": `${github_url}/issues`,
    "icon": "https://www.google.com/s2/favicons?sz=64&domain=shinshin.moe",
    "match": ["https://enka.network/*"],
    "run-at": "document-idle",
    "grant": "none",
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        {
            name: "set-headers",
            apply: "serve",
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    res.setHeader("Access-Control-Allow-Private-Network", "true");
                    next();
                });
            },
        },
        monkey({
            entry: "src/main.ts",
            userscript: manifest,
        }),
    ],
});

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// Read JSON file
const urls = JSON.parse(fs.readFileSync("urls.json", "utf8"));

// Ensure saved folder exists
const folder = path.join(__dirname, "saved");
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Helper to download one file
function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith("https") ? https : http;
        client.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed: ${url} (status ${res.statusCode})`));
                return;
            }
            const fileStream = fs.createWriteStream(filepath);
            res.pipe(fileStream);
            fileStream.on("finish", () => {
                fileStream.close();
                resolve();
            });
        }).on("error", reject);
    });
}

// Main
let now = new Date();
// const isoStringDate = now.toISOString();
console.log(now);

(async () => {
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const ext = path.extname(new URL(url).pathname) || ".jpg";
        const filePath = path.join(folder, `image-${i + 1}${ext}`);
        try {
            console.log(`Downloading: ${url}`);
            await downloadFile(url, filePath);
        } catch (err) {
            console.error(`Error downloading ${url}:`, err.message);
        }
    }
    console.log("✅ All downloads finished!");
})();

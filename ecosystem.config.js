module.exports = {
    apps: [
        {
            name: "news",
            script: "./dist/app.js",
            watch: true,
            node_args: '-r dotenv/config'
        },
    ],
};
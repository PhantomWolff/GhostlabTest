const WebpackDevServer = require("webpack-dev-server");
const path = require("path");
const webpack = require("webpack");

const compiler = webpack({
    devtool: "inline-source-map",
    entry: [
        "webpack-dev-server/client?http://localhost:1338/",
        require.resolve("MPageFusion/dist/css/mpage-fusion.css"),
        require.resolve("fusion-calendar/dist/css/fusion-calendar.css"),
        "./index.js"
    ],
    output: {
        path: path.join(process.cwd(), "dist"),
        filename: "bundle.js",
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.join(__dirname, "../..")
                ],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [["es2015", { "modules": false }]],
                            plugins: [
                                ["transform-es2015-classes", { loose: true }]
                            ]
                        }
                    }
                ]
            },
            {
                test: require.resolve("MPageFusion"),
                use: [{
                    loader: "expose-loader",
                    options: "MPageFusion"
                }]
            },
            {
                test: /\.(less|css)$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
});
const port = Number(process.env.PORT || 1338);

const server = new WebpackDevServer(compiler, {
    publicPath: "/dist/",
    historyApiFallback: true,
    disableHostCheck: true,
    noInfo: true,
    contentBase: "./build"
});

server.listen(port, () => {
    console.log(`Server started. Please go to http://localhost:${port}`);
});

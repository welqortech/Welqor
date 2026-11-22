const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SEO = require('./src/seo.json');
const SITE = require('./src/site.json');

// One HTML file per page (about.html, work/team.html ...), each with its own
// title, description and canonical address. After the build,
// scripts/prerender.js renders every page into its file, so the content is
// readable without JavaScript. Vercel serves them at clean URLs (cleanUrls
// in vercel.json) and serves 404.html, with a real 404 status, for anything else.
const fileFor = (route) => (route === '/' ? 'index.html' : `${route.slice(1)}.html`);
const urlFor = (route) => SITE.url + route;

const PAGES = [
  ...Object.entries(SEO).map(([route, page]) => ({ file: fileFor(route), page, url: urlFor(route) })),
  { file: '404.html', page: { title: 'Page not found', description: SEO['/'].description }, url: null },
];

const babel = { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' };
const assets = (emit) => ({
  test: /\.(png|jpe?g|gif|svg|webp|avif|ico|woff2?)$/i,
  type: 'asset/resource',
  generator: { emit },
});

module.exports = (env, argv) => {
  const isDev = argv.mode !== 'production';

  const client = {
    name: 'client',
    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? 'assets/[name].js' : 'assets/[name].[contenthash:8].js',
      assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
      publicPath: '/', // absolute, so nested routes like /work/team still find the bundle
      clean: true,
    },

    resolve: { extensions: ['.js', '.jsx'] },

    module: {
      rules: [
        babel,
        {
          test: /\.css$/i,
          // Production: a real stylesheet <link>, so pre-rendered pages are
          // styled before (and without) JavaScript.
          use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
        },
        assets(true),
      ],
    },

    plugins: [
      ...(isDev ? [] : [new MiniCssExtractPlugin({ filename: 'assets/[name].[contenthash:8].css' })]),
      ...PAGES.map(
        ({ file, page, url }) =>
          new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.svg',
            filename: file,
            page,
            url,
            verification: SITE.googleSiteVerification,
            intro: file === 'index.html', // the intro animation plays on the landing page only
          })
      ),
    ],

    devtool: isDev ? 'eval-cheap-module-source-map' : false,

    devServer: {
      port: Number(process.env.PORT) || 3000,
      open: true,
      hot: true,
      historyApiFallback: {
        rewrites: Object.keys(SEO)
          .filter((r) => r !== '/')
          .map((r) => ({ from: new RegExp(`^${r}/?$`), to: `/${fileFor(r)}` })),
      },
    },

    performance: { hints: false },
  };

  // A Node build of the app, used only by scripts/prerender.js.
  const server = {
    name: 'server',
    target: 'node',
    entry: './src/prerender.jsx',
    output: {
      path: path.resolve(__dirname, 'build-ssr'),
      filename: 'prerender.js',
      library: { type: 'commonjs2' },
      assetModuleFilename: 'assets/[name].[contenthash:8][ext]', // same URLs as the client
      publicPath: '/',
      clean: true,
    },
    resolve: { extensions: ['.js', '.jsx'] },
    module: {
      rules: [babel, { test: /\.css$/i, type: 'asset/source' }, assets(false)],
    },
    optimization: { minimize: false },
    performance: { hints: false },
  };

  return isDev ? client : [client, server];
};

module.exports.PAGES = PAGES;
module.exports.fileFor = fileFor;

const path = require('path');

const { readdirSync, statSync } = require('fs');

const srcDir = path.resolve(__dirname, 'src');

const parseModulesToAlias = (p) =>
    readdirSync(p)
        .filter((f) => statSync(`${p}/${f}`).isDirectory())
        .reduce((dirs, current) => ({
            ...dirs,
            [`~${current}`]: path.resolve(__dirname, `${p}/${current}`),
        }), {});

module.exports = {
    mode: 'production',

    entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        }
                    }
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },

    // optimization: {
    //     removeAvailableModules: false,
    //     removeEmptyChunks: false,
    //     minimize: false,
    //     splitChunks: false
    // },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
        // alias: {
        //     '~': srcDir,
        //     ...parseModulesToAlias(`${srcDir}/modules`),
        // }
    },

    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react',
        },
        'react-router-dom': {
            root: 'ReactRouterDOM',
            commonjs2: 'react-router-dom',
            commonjs: 'react-router-dom',
            amd: 'react-router-dom',
            umd: 'react-router-dom',
        }
    },

    output: {
        filename: '[name].js',
        pathinfo: false,
        path: path.resolve(__dirname, 'dist'),
        library: '@aerocms/client',
        libraryTarget: 'umd'
    },
};

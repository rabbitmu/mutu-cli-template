/**
 * ExtractTextPlugin config
 */
module.exports = function(fallback) {
    return {
        use: [
            {
                loader: 'css-loader',
                options: {
                    minimize: process.env.NODE_ENV === 'production',
                    sourceMap: true
                    // modules: true
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'sass-loader'
        ],
        fallback
    }
}

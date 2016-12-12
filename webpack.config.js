module.exports = 
{  
  entry: './src/Main.ts',
  devtool: 'source-map',
  output: 
  {
    filename: 'build/bundle.js'
  },
  resolve: 
  {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: 
  {
    loaders: 
    [
      { test: /\.ts$/, loader: 'ts-loader' }  
    ]
  }
}
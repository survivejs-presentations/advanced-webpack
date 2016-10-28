// Import React
import React from "react";
import mapValues from "lodash/mapValues";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  List,
  ListItem,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Table,
  TableRow,
  TableHeaderItem,
  TableItem,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");
require("./custom.css");

const slideTransition = ["slide"];
const images = mapValues({
  survivejs: require("../images/survivejs.png"),
  webpack: require("../images/webpack.png"),
  webpackGraph: require("../images/webpack-graph.png"),
}, v => v.replace('/', ''));

preloader(images);

const theme = createTheme({
  primary: "white",
  secondary: "black",
  tertiary: "#09b5c4",
  quartenary: "rgba(255, 219, 169, 0.43)"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={slideTransition} transitionDuration={500}>
          <Slide transition={slideTransition} bgColor="secondary">
            <Heading size={1} fit caps lineHeight={1} textColor="tertiary">
              Advanced webpack
            </Heading>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Build Tools
            </Heading>
            <Layout>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeaderItem>1st Gen.</TableHeaderItem>
                    <TableHeaderItem>2nd Gen.</TableHeaderItem>
                    <TableHeaderItem>3rd Gen.</TableHeaderItem>
                  </TableRow>
                </thead>
                <tbody>
                  <TableRow>
                    <TableItem>Make</TableItem>
                    <TableItem>Grunt</TableItem>
                    <TableItem>Browserify</TableItem>
                  </TableRow>
                  <TableRow>
                    <TableItem></TableItem>
                    <TableItem>Gulp</TableItem>
                    <TableItem>Brunch</TableItem>
                  </TableRow>
                  <TableRow>
                    <TableItem></TableItem>
                    <TableItem>Broccoli</TableItem>
                    <TableItem>JSPM</TableItem>
                  </TableRow>
                  <TableRow>
                    <TableItem></TableItem>
                    <TableItem></TableItem>
                    <TableItem><i>webpack</i></TableItem>
                  </TableRow>
                </tbody>
              </Table>
            </Layout>
          </Slide>

          <Slide transition={slideTransition}>
            <Image src={images.webpack} height="364px" />
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Overview
            </Heading>
            <List>
              <Appear><ListItem>Bundler, not a task runner</ListItem></Appear>
              <Appear><ListItem>npm is commonly used for managing tasks</ListItem></Appear>
              <Appear><ListItem>Grunt and Gulp integrations exist. Let webpack do the hard work</ListItem></Appear>
              <Appear><ListItem>Quick start - <code>webpack app bundle.js</code></ListItem></Appear>
              <Appear><ListItem>Configuration driven</ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition} bgColor="secondary">
            <Heading size={2} textColor="tertiary">
              Configuration
            </Heading>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Minimal Configuration
            </Heading>
            <CodePane lang="javascript">
          {`module.exports = {
  entry: {
    ...
  },
  output: {
    ...
  },
  module: {
    rules: [
      ...
    ]
  },
  plugins: [
    ...
  ]
};`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Multi-Compiler Mode
            </Heading>
            <CodePane lang="javascript">
          {`module.exports = [
  {
    entry: {
      ...
    },
    ...
  },
  {
    entry: {
      ...
    },
    ...
  }
];`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Core Concepts
            </Heading>
            <List>
              <Appear><ListItem><b>Entries</b> - Where to start bundling?</ListItem></Appear>
              <Appear><ListItem><b>Output</b> - Where to output?</ListItem></Appear>
              <Appear><ListItem><b>Loaders</b> - How to transform?</ListItem></Appear>
              <Appear><ListItem><b>Plugins</b> - How to bundle?</ListItem></Appear>
              <Appear><ListItem><b>Resolving</b> - How to resolve modules?</ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Entries
            </Heading>
            <CodePane lang="javascript">
          {`const config = {
  entry: {
    style: PATHS.style,
    app: PATHS.app
  }
};`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Output
            </Heading>
            <CodePane lang="javascript">
          {`const config = {
  output: {
    path: PATHS.build,
    publicPath: '//path.to.your.cdn.com/assets/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  }
};`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Loaders - webpack 1
            </Heading>
            <CodePane lang="javascript">
          {`const config = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          {
            loader: 'style',
          },
          {
            loader: 'css',
            query: {
              modules: true
            }
        ],
        include: PATHS.style
      }
    ]
  }
};`}
            </CodePane>
          </Slide>


          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Loaders - webpack 2
            </Heading>
            <CodePane lang="javascript">
          {`const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader' // Note the suffix
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ],
        include: PATHS.style
      }
    ]
  }
};`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Loaders - Key Ideas
            </Heading>
            <List>
              <Appear><ListItem><code>loaders: ['style-loader', 'css-loader']</code> - <code>style(css(input))</code></ListItem></Appear>
              <Appear><ListItem>Evaluation order: from bottom to top, right to left</ListItem></Appear>
              <Appear><ListItem>Two phases during evaluation - pitching and running. Example: pitch <code>style</code>, pitch <code>css</code>, read <code>input</code>, run <code>css</code>, run <code>style</code>.</ListItem></Appear>
              <Appear><ListItem>Given {`it's`} not a good idea to bundle everything as JavaScript, there are plugins like <code>ExtractTextPlugin</code></ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Plugins
            </Heading>
            <CodePane lang="javascript">
          {`const config = {
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    })
  ]
};`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Resolving
            </Heading>
            <CodePane lang="javascript">
          {`const config = {
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
    },
    extensions: ['.js', '.json', '.jsx']
  }
};`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition} bgColor="secondary">
            <Heading size={2} textColor="tertiary">
              Managing Configuration
            </Heading>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Composition
            </Heading>
            <List>
              <Appear><ListItem>Single file (Make style) vs. multiple files</ListItem></Appear>
              <Appear><ListItem><code>Object.assign</code> to merge?</ListItem></Appear>
              <Appear><ListItem><Link href="https://www.npmjs.com/package/webpack-merge">webpack-merge</Link> might work better*</ListItem></Appear>
              <Appear><ListItem>Lots of merge variants, no clear standard yet</ListItem></Appear>
              <Appear><ListItem>Functions (think postcss) are problematic for merging</ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              npm as a Task Runner
            </Heading>
            <CodePane lang="json">
          {`{
  "scripts": {
    "start": "webpack --env dev",
    "build": "webpack --env build"
  }
}`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Capturing Env at Configuration
            </Heading>
            <CodePane lang="javascript">
          {`module.exports = function(env) {
  ... // switch based on env now
};`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              npm and Multiple Configurations
            </Heading>
            <CodePane lang="json">
          {`{
  "scripts": {
    "start": "webpack --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.prod.js"
  }
}`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Naïve Merging
            </Heading>
            <CodePane lang="javascript">
          {`...

const entries = Object.assign({}, entries, {
  vendor: ['vue']
});

...`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Merging with <code>webpack-merge</code>
            </Heading>
            <CodePane lang="javascript">
          {`const buildConfig = merge(common, {
  entry: {
    vendor: ['vue']
  }
});`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition} bgColor="secondary">
            <Heading size={2} textColor="tertiary">
              Understanding Chunks
            </Heading>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Chunk Types
            </Heading>
            <List>
              <Appear><ListItem><b>Entry chunks</b> - Webpack runtime and modules it loads</ListItem></Appear>
              <Appear><ListItem><b>Normal chunks</b> - No webpack runtime, loaded dynamically (JSONP)</ListItem></Appear>
              <Appear><ListItem><b>Initial chunks</b> - <code>CommonsChunkPlugin</code> related detail. These count towards initial loading time of the application.</ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Entry Chunks
            </Heading>
            <List>
              <Appear><ListItem></ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Normal Chunks
            </Heading>
            <List>
              <Appear><ListItem></ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition}>
            <Image src={images.webpackGraph} height="324px" />
          </Slide>

          <Slide transition={slideTransition}>
            <Link href="http://www.survivejs.com/">
              <Heading size={1}>
                SurviveJS
              </Heading>
            </Link>
            <Image src={images.survivejs} margin="0px auto 40px" height="524px"/>
          </Slide>

          <Slide transition={slideTransition} bgColor="tertiary">
            <Heading size={1} caps fit textColor="primary">
              Made in Finland by
            </Heading>
            <Link href="https://twitter.com/bebraw">
              <Heading caps fit size={2} textColor="secondary">
                Juho Vepsäläinen
              </Heading>
            </Link>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

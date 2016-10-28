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
    app: PATHS.app,
    style: PATHS.style
  }
};`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Entries - Key Ideas
            </Heading>
            <List>
              <Appear><ListItem>Starting point of the whole bundling process</ListItem></Appear>
              <Appear><ListItem>Changes to modules within an entry will invalidate (important idea later!)</ListItem></Appear>
              <Appear><ListItem>Allows separation of vendor dependencies in tandem with <code>CommonsChunkPlugin</code></ListItem></Appear>
              <Appear><ListItem>Recommendation: Favor object over array (easier to manage, merge)</ListItem></Appear>
            </List>
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
            <Heading size={1}>
              Output - Key Ideas
            </Heading>
            <List>
              <Appear><ListItem>End of the bundling process</ListItem></Appear>
              <Appear><ListItem>Instead of pointing to local assets, you can point to a CDN through <code>publicPath</code></ListItem></Appear>
              <Appear><ListItem>Supports variety of placeholders</ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Output - Placeholders
            </Heading>
            <List>
              <Appear><ListItem><code>[path]</code> - Returns an entry path</ListItem></Appear>
              <Appear><ListItem><code>[name]</code> - Returns an entry name</ListItem></Appear>
              <Appear><ListItem><code>[hash]</code> - Returns the build hash</ListItem></Appear>
              <Appear><ListItem><code>[chunkhash]</code> - Returns a chunk specific hash</ListItem></Appear>
            </List>
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
    rules: [ // rules over loaders
      {
        test: /\.css$/,
        use: [ // use over loaders
          {
            loader: 'style-loader' // note the suffix
          },
          {
            loader: 'css-loader',
            options: { // options over query
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
              <Appear><ListItem>Transform assets from form to another</ListItem></Appear>
              <Appear><ListItem><code>loaders: ['style-loader', 'css-loader']</code></ListItem></Appear>
              <Appear><ListItem>Read as <code>style(css(input))</code></ListItem></Appear>
              <Appear><ListItem>Given {`it's`} not a good idea to bundle everything as JavaScript (FOUC, performance), there are plugins like <code>ExtractTextPlugin</code></ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Loaders - Evaluation
            </Heading>
            <List>
              <Appear><ListItem>Evaluation order: from bottom to top, right to left, multiple matches possible</ListItem></Appear>
              <Appear><ListItem>Two phases during evaluation - pitching and running</ListItem></Appear>
              <Appear><ListItem>Example: pitch <code>style</code>, pitch <code>css</code>, read <code>input</code>, run <code>css</code>, run <code>style</code>.</ListItem></Appear>
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
            <Heading size={1}>
              Plugins - Key Ideas
            </Heading>
            <List>
              <Appear><ListItem>Evaluated from bottom to top</ListItem></Appear>
              <Appear><ListItem>Have access to webpack lifecycle hooks</ListItem></Appear>
              <Appear><ListItem>Complements loaders and can be used to implement tasks even</ListItem></Appear>
              <Appear><ListItem>Sometimes combined with loaders (example: <code>ExtractTextPlugin</code>)</ListItem></Appear>
            </List>
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

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Resolving - Key Ideas
            </Heading>
            <List>
              <Appear><ListItem>Patch module resolution to fit your project</ListItem></Appear>
              <Appear><ListItem>{`It's`} possible to patch loader resolution too through <code>resolveLoader</code> (handy with RequireJS, custom work)</ListItem></Appear>
              <Appear><ListItem>Can tie your project to webpack so be careful (pure Node may need hacks like patching <code>NODE_ENV</code>)</ListItem></Appear>
            </List>
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

          <Slide transition={slideTransition}>
            <Heading fit>
              Managing Configuration - Key Ideas
            </Heading>
            <List>
              <Appear><ListItem>No single right way</ListItem></Appear>
              <Appear><ListItem><code>merge</code> allow composition</ListItem></Appear>
              <Appear><ListItem>Composition allows sharing ideas across projects. Less boilerplate</ListItem></Appear>
              <Appear><ListItem>{`Don't`} use boilerplate configuration you {`don't`} understand. This can bite later</ListItem></Appear>
            </List>
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
              Webpack Runtime
            </Heading>
            <List>
              <Appear><ListItem>Bootstraps the entire application</ListItem></Appear>
              <Appear><ListItem>Contains <code>manifest</code> (can be extracted with a <Link href="https://github.com/diurnalist/chunk-manifest-webpack-plugin">plugin</Link>)</ListItem></Appear>
              <Appear><ListItem>Requires special care with long term caching</ListItem></Appear>
            </List>
            <Appear>
              <CodePane lang="javascript">
          {`script.src = __webpack_require__.p + "" + {
  "0": "c6c9db881503336ad305",
  "1": "f48c218f854d0ed1fc58",
  "2": "cc5a3042f68bec8d1148"
}[chunkId] + ".js";`}
              </CodePane>
            </Appear>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading caps fit size={1}>
              Entry Chunks
            </Heading>
            <List>
              <Appear><ListItem>Remember entries!</ListItem></Appear>
            </List>
            <Appear>
              <CodePane lang="javascript">
          {`Version: webpack 2.1.0-beta.25
Time: 11180ms
                               Asset       Size  Chunks             Chunk Names
  vendor.c6c9db881503336ad305.js.map     131 kB    0, 3  [emitted]  vendor
      vendor.c6c9db881503336ad305.js     107 kB    0, 3  [emitted]  vendor
         app.cc5a3042f68bec8d1148.js  497 bytes    2, 3  [emitted]  app
    manifest.4e20c28ac34ef5d67895.js    5.65 kB       3  [emitted]  manifest
      style.f48c218f854d0ed1fc58.css    13.9 kB    1, 3  [emitted]  style
       style.f48c218f854d0ed1fc58.js  425 bytes    1, 3  [emitted]  style
   style.f48c218f854d0ed1fc58.js.map  532 bytes    1, 3  [emitted]  style
  style.f48c218f854d0ed1fc58.css.map  107 bytes    1, 3  [emitted]  style
     app.cc5a3042f68bec8d1148.js.map  744 bytes    2, 3  [emitted]  app
manifest.4e20c28ac34ef5d67895.js.map    5.74 kB       3  [emitted]  manifest
                          index.html  564 bytes          [emitted]`}
              </CodePane>
            </Appear>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Normal Chunks
            </Heading>
            <List>
              <Appear><ListItem>Used for loading functionality runtime based on actual usage (think clicking, scrolling)</ListItem></Appear>
              <Appear><ListItem>Defined as split points through <code>require.ensure</code> and <code>System.import</code></ListItem></Appear>
              <Appear><ListItem><b>JSONP</b></ListItem></Appear>
            </List>
            <Appear>
              <CodePane lang="javascript">
          {`webpackJsonp([1, 4], {
  156: function(s, o) {
    s.exports = { ... }
  }
});`}
              </CodePane>
            </Appear>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Initial Chunks
            </Heading>
            <List>
              <Appear><ListItem>Normal chunk that counts towards <b>initial</b> loading time</ListItem></Appear>
              <Appear><ListItem>Generated by <code>CommonsChunkPlugin</code></ListItem></Appear>
              <Appear><ListItem>If <code>CommonsChunkPlugin</code> is used, runtime is moved to an initial chunk</ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading fit>
              <code>CommonsChunkPlugin</code>
            </Heading>
            <CodePane lang="javascript">
          {`exports.extractBundle = function(options) {
  const entry = {};
  // name = 'vendor', entries = ['react', 'react-dnd', ...]
  entry[options.name] = options.entries;

  return {
    // define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // extract bundle and manifest files. Manifest is
      // needed for reliable caching
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
}`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Splitting Process
            </Heading>
            <Image src={images.webpackGraph} height="324px" />
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              <code>require.ensure</code>
            </Heading>
            <CodePane lang="javascript">
          {`require.ensure([], require => {
  const lunr = require('lunr');
  const search = require('../search_index.json');

  // ... Do something now
});`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              <code>System.import</code>
            </Heading>
            <CodePane lang="javascript">
          {`// Load lunr and index through a separate module
System.import('./search').then(search => {
  // ... Do something now
}).catch(err => {
  // Handle possible errors (not possible with require.ensure)
});`}
            </CodePane>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading size={1}>
              Chunks - Key Ideas
            </Heading>
            <List>
              <Appear><ListItem>Understanding chunks unlocks most of {`webpack's`} power</ListItem></Appear>
              <Appear><ListItem>Start from entries</ListItem></Appear>
              <Appear><ListItem>Define split points for parts of your application that can be loaded based on usage</ListItem></Appear>
              <Appear><ListItem>Set up <code>CommonsChunkPlugin</code> to split main bundle(s) and to benefit from long term caching</ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={slideTransition} bgColor="secondary">
            <Heading size={2} textColor="tertiary">
              Long term Caching
            </Heading>
          </Slide>

          <Slide transition={slideTransition}>
            <Heading fit>
              Long term caching - Key Ideas
            </Heading>
            <List>
              <Appear><ListItem>TODO</ListItem></Appear>
            </List>
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

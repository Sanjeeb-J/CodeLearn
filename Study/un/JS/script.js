
// Global variables
let currentUser = null;
let allCourseTopics = [];

// Course data with all the topics you specified
const courseData = { 
    html: {
        title: "HTML5 Fundamentals",
        totalLessons: 62,
        sections: [
            {
                title: "HTML Tutorial",
                lessons: [
                    { id: "html-home", title: "HTML HOME" },
                    { id: "html-introduction", title: "HTML Introduction" },
                    { id: "html-editors", title: "HTML Editors" },
                    { id: "html-basic", title: "HTML Basic" },
                    { id: "html-elements", title: "HTML Elements" },
                    { id: "html-attributes", title: "HTML Attributes" },
                    { id: "html-headings", title: "HTML Headings" },
                    { id: "html-paragraphs", title: "HTML Paragraphs" },
                    { id: "html-styles", title: "HTML Styles" },
                    { id: "html-formatting", title: "HTML Formatting" },
                    { id: "html-quotations", title: "HTML Quotations" },
                    { id: "html-comments", title: "HTML Comments" },
                    { id: "html-colors", title: "HTML Colors" },
                    { id: "html-css", title: "HTML CSS" },
                    { id: "html-links", title: "HTML Links" },
                    { id: "html-images", title: "HTML Images" },
                    { id: "html-favicon", title: "HTML Favicon" },
                    { id: "html-page-title", title: "HTML Page Title" },
                    { id: "html-tables", title: "HTML Tables" },
                    { id: "html-lists", title: "HTML Lists" },
                    { id: "html-block-inline", title: "HTML Block & Inline" },
                    { id: "html-div", title: "HTML Div" },
                    { id: "html-classes", title: "HTML Classes" },
                    { id: "html-id", title: "HTML Id" },
                    { id: "html-iframes", title: "HTML Iframes" },
                    { id: "html-javascript", title: "HTML JavaScript" },
                    { id: "html-file-paths", title: "HTML File Paths" },
                    { id: "html-head", title: "HTML Head" },
                    { id: "html-layout", title: "HTML Layout" },
                    { id: "html-responsive", title: "HTML Responsive" },
                    { id: "html-computercode", title: "HTML Computercode" },
                    { id: "html-semantics", title: "HTML Semantics" },
                    { id: "html-style-guide", title: "HTML Style Guide" },
                    { id: "html-entities", title: "HTML Entities" },
                    { id: "html-symbols", title: "HTML Symbols" },
                    { id: "html-emojis", title: "HTML Emojis" },
                    { id: "html-charsets", title: "HTML Charsets" },
                    { id: "html-url-encode", title: "HTML URL Encode" },
                    { id: "html-vs-xhtml", title: "HTML vs. XHTML" }
                ]
            },
            {
                title: "HTML Forms",
                lessons: [
                    { id: "html-forms", title: "HTML Forms" },
                    { id: "html-form-attributes", title: "HTML Form Attributes" },
                    { id: "html-form-elements", title: "HTML Form Elements" },
                    { id: "html-input-types", title: "HTML Input Types" },
                    { id: "html-input-attributes", title: "HTML Input Attributes" },
                    { id: "input-form-attributes", title: "Input Form Attributes" }
                ]
            },
            {
                title: "HTML Graphics",
                lessons: [
                    { id: "html-canvas", title: "HTML Canvas" },
                    { id: "html-svg", title: "HTML SVG" }
                ]
            },
            {
                title: "HTML Media",
                lessons: [
                    { id: "html-media", title: "HTML Media" },
                    { id: "html-video", title: "HTML Video" },
                    { id: "html-audio", title: "HTML Audio" },
                    { id: "html-plug-ins", title: "HTML Plug-ins" },
                    { id: "html-youtube", title: "HTML YouTube" }
                ]
            },
            {
                title: "HTML APIs",
                lessons: [
                    { id: "html-web-apis", title: "HTML Web APIs" },
                    { id: "html-geolocation", title: "HTML Geolocation" },
                    { id: "html-drag-drop", title: "HTML Drag and Drop" },
                    { id: "html-web-storage", title: "HTML Web Storage" },
                    { id: "html-web-workers", title: "HTML Web Workers" },
                    { id: "html-sse", title: "HTML SSE" }
                ]
            },
            {
                title: "HTML Examples",
                lessons: [
                    { id: "html-examples", title: "HTML Examples" },
                    { id: "html-editor", title: "HTML Editor" },
                    { id: "html-quiz", title: "HTML Quiz" },
                    { id: "html-exercises", title: "HTML Exercises" },
                    { id: "html-website", title: "HTML Website" },
                    { id: "html-syllabus", title: "HTML Syllabus" },
                    { id: "html-study-plan", title: "HTML Study Plan" },
                    { id: "html-interview-prep", title: "HTML Interview Prep" },
                    { id: "html-bootcamp", title: "HTML Bootcamp" },
                    { id: "html-certificate", title: "HTML Certificate" },
                    { id: "html-summary", title: "HTML Summary" },
                    { id: "html-accessibility", title: "HTML Accessibility" }
                ]
            }
        ]
    },
    css: {
        title: "CSS3 Styling",
        totalLessons: 88,
        sections: [
            {
                title: "CSS Tutorial",
                lessons: [
                    { id: "css-home", title: "CSS HOME" },
                    { id: "css-introduction", title: "CSS Introduction" },
                    { id: "css-syntax", title: "CSS Syntax" },
                    { id: "css-selectors", title: "CSS Selectors" },
                    { id: "css-how-to", title: "CSS How To" },
                    { id: "css-comments", title: "CSS Comments" },
                    { id: "css-colors", title: "CSS Colors" },
                    { id: "css-backgrounds", title: "CSS Backgrounds" },
                    { id: "css-borders", title: "CSS Borders" },
                    { id: "css-margins", title: "CSS Margins" },
                    { id: "css-padding", title: "CSS Padding" },
                    { id: "css-height-width", title: "CSS Height/Width" },
                    { id: "css-box-model", title: "CSS Box Model" },
                    { id: "css-outline", title: "CSS Outline" },
                    { id: "css-text", title: "CSS Text" },
                    { id: "css-fonts", title: "CSS Fonts" },
                    { id: "css-icons", title: "CSS Icons" },
                    { id: "css-links", title: "CSS Links" },
                    { id: "css-lists", title: "CSS Lists" },
                    { id: "css-tables", title: "CSS Tables" },
                    { id: "css-display", title: "CSS Display" },
                    { id: "css-max-width", title: "CSS Max-width" },
                    { id: "css-position", title: "CSS Position" },
                    { id: "css-z-index", title: "CSS Z-index" },
                    { id: "css-overflow", title: "CSS Overflow" },
                    { id: "css-float", title: "CSS Float" },
                    { id: "css-inline-block", title: "CSS Inline-block" },
                    { id: "css-align", title: "CSS Align" },
                    { id: "css-combinators", title: "CSS Combinators" },
                    { id: "css-pseudo-classes", title: "CSS Pseudo-classes" },
                    { id: "css-pseudo-elements", title: "CSS Pseudo-elements" },
                    { id: "css-opacity", title: "CSS Opacity" },
                    { id: "css-navigation-bar", title: "CSS Navigation Bar" },
                    { id: "css-dropdowns", title: "CSS Dropdowns" },
                    { id: "css-image-gallery", title: "CSS Image Gallery" },
                    { id: "css-image-sprites", title: "CSS Image Sprites" },
                    { id: "css-attr-selectors", title: "CSS Attr Selectors" },
                    { id: "css-forms", title: "CSS Forms" },
                    { id: "css-counters", title: "CSS Counters" },
                    { id: "css-website-layout", title: "CSS Website Layout" },
                    { id: "css-units", title: "CSS Units" },
                    { id: "css-specificity", title: "CSS Specificity" },
                    { id: "css-important", title: "CSS !important" },
                    { id: "css-math-functions", title: "CSS Math Functions" }
                ]
            },
            {
                title: "CSS Advanced",
                lessons: [
                    { id: "css-rounded-corners", title: "CSS Rounded Corners" },
                    { id: "css-border-images", title: "CSS Border Images" },
                    { id: "css-backgrounds-advanced", title: "CSS Backgrounds" },
                    { id: "css-colors-advanced", title: "CSS Colors" },
                    { id: "css-color-keywords", title: "CSS Color Keywords" },
                    { id: "css-gradients", title: "CSS Gradients" },
                    { id: "css-shadows", title: "CSS Shadows" },
                    { id: "css-text-effects", title: "CSS Text Effects" },
                    { id: "css-web-fonts", title: "CSS Web Fonts" },
                    { id: "css-2d-transforms", title: "CSS 2D Transforms" },
                    { id: "css-3d-transforms", title: "CSS 3D Transforms" },
                    { id: "css-transitions", title: "CSS Transitions" },
                    { id: "css-animations", title: "CSS Animations" },
                    { id: "css-tooltips", title: "CSS Tooltips" },
                    { id: "css-image-styling", title: "CSS Image Styling" },
                    { id: "css-image-centering", title: "CSS Image Centering" },
                    { id: "css-image-filters", title: "CSS Image Filters" },
                    { id: "css-image-shapes", title: "CSS Image Shapes" },
                    { id: "css-object-fit", title: "CSS object-fit" },
                    { id: "css-object-position", title: "CSS object-position" },
                    { id: "css-masking", title: "CSS Masking" },
                    { id: "css-buttons", title: "CSS Buttons" },
                    { id: "css-pagination", title: "CSS Pagination" },
                    { id: "css-multiple-columns", title: "CSS Multiple Columns" },
                    { id: "css-user-interface", title: "CSS User Interface" },
                    { id: "css-variables", title: "CSS Variables" },
                    { id: "css-property", title: "CSS @property" },
                    { id: "css-box-sizing", title: "CSS Box Sizing" },
                    { id: "css-media-queries", title: "CSS Media Queries" },
                    { id: "css-mq-examples", title: "CSS MQ Examples" }
                ]
            },
            {
                title: "CSS Flexbox",
                lessons: [
                    { id: "flexbox-intro", title: "Flexbox Intro" },
                    { id: "flex-container", title: "Flex Container" },
                    { id: "flex-items", title: "Flex Items" },
                    { id: "flex-responsive", title: "Flex Responsive" }
                ]
            },
            {
                title: "CSS Grid",
                lessons: [
                    { id: "grid-intro", title: "Grid Intro" },
                    { id: "grid-columns-rows", title: "Grid Columns/Rows" },
                    { id: "grid-container", title: "Grid Container" },
                    { id: "grid-item", title: "Grid Item" }
                ]
            },
            {
                title: "CSS Responsive",
                lessons: [
                    { id: "rwd-intro", title: "RWD Intro" },
                    { id: "rwd-viewport", title: "RWD Viewport" },
                    { id: "rwd-grid-view", title: "RWD Grid View" },
                    { id: "rwd-media-queries", title: "RWD Media Queries" },
                    { id: "rwd-images", title: "RWD Images" },
                    { id: "rwd-videos", title: "RWD Videos" },
                    { id: "rwd-frameworks", title: "RWD Frameworks" },
                    { id: "rwd-templates", title: "RWD Templates" }
                ]
            },
            {
                title: "CSS SASS",
                lessons: [
                    { id: "sass-tutorial", title: "SASS Tutorial" }
                ]
            },
            {
                title: "CSS Examples",
                lessons: [
                    { id: "css-templates", title: "CSS Templates" },
                    { id: "css-examples", title: "CSS Examples" },
                    { id: "css-editor", title: "CSS Editor" },
                    { id: "css-snippets", title: "CSS Snippets" },
                    { id: "css-quiz", title: "CSS Quiz" },
                    { id: "css-exercises", title: "CSS Exercises" },
                    { id: "css-website", title: "CSS Website" },
                    { id: "css-syllabus", title: "CSS Syllabus" },
                    { id: "css-study-plan", title: "CSS Study Plan" },
                    { id: "css-interview-prep", title: "CSS Interview Prep" },
                    { id: "css-bootcamp", title: "CSS Bootcamp" },
                    { id: "css-certificate", title: "CSS Certificate" }
                ]
            }
        ]
    },
    javascript: {
        title: "JavaScript Programming",
        totalLessons: 134,
        sections: [
            {
                title: "JS Tutorial",
                lessons: [
                    { id: "js-home", title: "JS HOME" },
                    { id: "js-introduction", title: "JS Introduction" },
                    { id: "js-where-to", title: "JS Where To" },
                    { id: "js-output", title: "JS Output" },
                    { id: "js-statements", title: "JS Statements" },
                    { id: "js-syntax", title: "JS Syntax" },
                    { id: "js-comments", title: "JS Comments" },
                    { id: "js-variables", title: "JS Variables" },
                    { id: "js-let", title: "JS Let" },
                    { id: "js-const", title: "JS Const" },
                    { id: "js-operators", title: "JS Operators" },
                    { id: "js-arithmetic", title: "JS Arithmetic" },
                    { id: "js-assignment", title: "JS Assignment" },
                    { id: "js-data-types", title: "JS Data Types" },
                    { id: "js-functions", title: "JS Functions" },
                    { id: "js-objects", title: "JS Objects" },
                    { id: "js-object-properties", title: "JS Object Properties" },
                    { id: "js-object-methods", title: "JS Object Methods" },
                    { id: "js-object-display", title: "JS Object Display" },
                    { id: "js-object-constructors", title: "JS Object Constructors" },
                    { id: "js-events", title: "JS Events" },
                    { id: "js-strings", title: "JS Strings" },
                    { id: "js-string-methods", title: "JS String Methods" },
                    { id: "js-string-search", title: "JS String Search" },
                    { id: "js-string-templates", title: "JS String Templates" },
                    { id: "js-numbers", title: "JS Numbers" },
                    { id: "js-bigint", title: "JS BigInt" },
                    { id: "js-number-methods", title: "JS Number Methods" },
                    { id: "js-number-properties", title: "JS Number Properties" },
                    { id: "js-arrays", title: "JS Arrays" },
                    { id: "js-array-methods", title: "JS Array Methods" },
                    { id: "js-array-search", title: "JS Array Search" },
                    { id: "js-array-sort", title: "JS Array Sort" },
                    { id: "js-array-iteration", title: "JS Array Iteration" },
                    { id: "js-array-const", title: "JS Array Const" },
                    { id: "js-dates", title: "JS Dates" },
                    { id: "js-date-formats", title: "JS Date Formats" },
                    { id: "js-date-get-methods", title: "JS Date Get Methods" },
                    { id: "js-date-set-methods", title: "JS Date Set Methods" },
                    { id: "js-math", title: "JS Math" },
                    { id: "js-random", title: "JS Random" },
                    { id: "js-booleans", title: "JS Booleans" },
                    { id: "js-comparisons", title: "JS Comparisons" },
                    { id: "js-if-else", title: "JS If Else" },
                    { id: "js-switch", title: "JS Switch" },
                    { id: "js-loop-for", title: "JS Loop For" },
                    { id: "js-loop-for-in", title: "JS Loop For In" },
                    { id: "js-loop-for-of", title: "JS Loop For Of" },
                    { id: "js-loop-while", title: "JS Loop While" },
                    { id: "js-break", title: "JS Break" },
                    { id: "js-iterables", title: "JS Iterables" },
                    { id: "js-sets", title: "JS Sets" },
                    { id: "js-set-methods", title: "JS Set Methods" },
                    { id: "js-maps", title: "JS Maps" },
                    { id: "js-map-methods", title: "JS Map Methods" },
                    { id: "js-typeof", title: "JS typeof" },
                    { id: "js-tostring", title: "JS toString()" },
                    { id: "js-type-conversion", title: "JS Type Conversion" },
                    { id: "js-destructuring", title: "JS Destructuring" },
                    { id: "js-bitwise", title: "JS Bitwise" },
                    { id: "js-regexp", title: "JS RegExp" },
                    { id: "js-precedence", title: "JS Precedence" },
                    { id: "js-errors", title: "JS Errors" },
                    { id: "js-scope", title: "JS Scope" },
                    { id: "js-hoisting", title: "JS Hoisting" },
                    { id: "js-strict-mode", title: "JS Strict Mode" },
                    { id: "js-this-keyword", title: "JS this Keyword" },
                    { id: "js-arrow-function", title: "JS Arrow Function" },
                    { id: "js-classes", title: "JS Classes" },
                    { id: "js-modules", title: "JS Modules" },
                    { id: "js-json", title: "JS JSON" },
                    { id: "js-debugging", title: "JS Debugging" },
                    { id: "js-style-guide", title: "JS Style Guide" },
                    { id: "js-best-practices", title: "JS Best Practices" },
                    { id: "js-mistakes", title: "JS Mistakes" },
                    { id: "js-performance", title: "JS Performance" },
                    { id: "js-reserved-words", title: "JS Reserved Words" }
                ]
            },
            {
                title: "JS Versions",
                lessons: [
                    { id: "js-versions", title: "JS Versions" },
                    { id: "js-2009-es5", title: "JS 2009 (ES5)" },
                    { id: "js-2015-es6", title: "JS 2015 (ES6)" },
                    { id: "js-2016", title: "JS 2016" },
                    { id: "js-2017", title: "JS 2017" },
                    { id: "js-2018", title: "JS 2018" },
                    { id: "js-2019", title: "JS 2019" },
                    { id: "js-2020", title: "JS 2020" },
                    { id: "js-2021", title: "JS 2021" },
                    { id: "js-2022", title: "JS 2022" },
                    { id: "js-2023", title: "JS 2023" },
                    { id: "js-2024", title: "JS 2024" },
                    { id: "js-ie-edge", title: "JS IE / Edge" },
                    { id: "js-history", title: "JS History" }
                ]
            },
            {
                title: "JS Objects",
                lessons: [
                    { id: "object-definitions", title: "Object Definitions" },
                    { id: "object-prototypes", title: "Object Prototypes" },
                    { id: "object-methods", title: "Object Methods" },
                    { id: "object-properties", title: "Object Properties" },
                    { id: "object-get-set", title: "Object Get / Set" },
                    { id: "object-protection", title: "Object Protection" }
                ]
            },
            {
                title: "JS Functions",
                lessons: [
                    { id: "function-definitions", title: "Function Definitions" },
                    { id: "function-parameters", title: "Function Parameters" },
                    { id: "function-invocation", title: "Function Invocation" },
                    { id: "function-call", title: "Function Call" },
                    { id: "function-apply", title: "Function Apply" },
                    { id: "function-bind", title: "Function Bind" },
                    { id: "function-closures", title: "Function Closures" }
                ]
            },
            {
                title: "JS Classes",
                lessons: [
                    { id: "class-intro", title: "Class Intro" },
                    { id: "class-inheritance", title: "Class Inheritance" },
                    { id: "class-static", title: "Class Static" }
                ]
            },
            {
                title: "JS Async",
                lessons: [
                    { id: "js-callbacks", title: "JS Callbacks" },
                    { id: "js-asynchronous", title: "JS Asynchronous" },
                    { id: "js-promises", title: "JS Promises" },
                    { id: "js-async-await", title: "JS Async/Await" }
                ]
            },
            {
                title: "JS HTML DOM",
                lessons: [
                    { id: "dom-intro", title: "DOM Intro" },
                    { id: "dom-methods", title: "DOM Methods" },
                    { id: "dom-document", title: "DOM Document" },
                    { id: "dom-elements", title: "DOM Elements" },
                    { id: "dom-html", title: "DOM HTML" },
                    { id: "dom-forms", title: "DOM Forms" },
                    { id: "dom-css", title: "DOM CSS" },
                    { id: "dom-animations", title: "DOM Animations" },
                    { id: "dom-events", title: "DOM Events" },
                    { id: "dom-event-listener", title: "DOM Event Listener" },
                    { id: "dom-navigation", title: "DOM Navigation" },
                    { id: "dom-nodes", title: "DOM Nodes" },
                    { id: "dom-collections", title: "DOM Collections" },
                    { id: "dom-node-lists", title: "DOM Node Lists" }
                ]
            },
            {
                title: "JS Browser BOM",
                lessons: [
                    { id: "js-window", title: "JS Window" },
                    { id: "js-screen", title: "JS Screen" },
                    { id: "js-location", title: "JS Location" },
                    { id: "js-history", title: "JS History" },
                    { id: "js-navigator", title: "JS Navigator" },
                    { id: "js-popup-alert", title: "JS Popup Alert" },
                    { id: "js-timing", title: "JS Timing" },
                    { id: "js-cookies", title: "JS Cookies" }
                ]
            },
            {
                title: "JS Web APIs",
                lessons: [
                    { id: "web-api-intro", title: "Web API Intro" },
                    { id: "web-validation-api", title: "Web Validation API" },
                    { id: "web-history-api", title: "Web History API" },
                    { id: "web-storage-api", title: "Web Storage API" },
                    { id: "web-worker-api", title: "Web Worker API" },
                    { id: "web-fetch-api", title: "Web Fetch API" },
                    { id: "web-geolocation-api", title: "Web Geolocation API" }
                ]
            },
            {
                title: "JS AJAX",
                lessons: [
                    { id: "ajax-intro", title: "AJAX Intro" },
                    { id: "ajax-xmlhttp", title: "AJAX XMLHttp" },
                    { id: "ajax-request", title: "AJAX Request" },
                    { id: "ajax-response", title: "AJAX Response" },
                    { id: "ajax-xml-file", title: "AJAX XML File" },
                    { id: "ajax-php", title: "AJAX PHP" },
                    { id: "ajax-asp", title: "AJAX ASP" },
                    { id: "ajax-database", title: "AJAX Database" },
                    { id: "ajax-applications", title: "AJAX Applications" },
                    { id: "ajax-examples", title: "AJAX Examples" }
                ]
            },
            {
                title: "JS JSON",
                lessons: [
                    { id: "json-intro", title: "JSON Intro" },
                    { id: "json-syntax", title: "JSON Syntax" },
                    { id: "json-vs-xml", title: "JSON vs XML" },
                    { id: "json-data-types", title: "JSON Data Types" },
                    { id: "json-parse", title: "JSON Parse" },
                    { id: "json-stringify", title: "JSON Stringify" },
                    { id: "json-objects", title: "JSON Objects" },
                    { id: "json-arrays", title: "JSON Arrays" },
                    { id: "json-server", title: "JSON Server" },
                    { id: "json-php", title: "JSON PHP" },
                    { id: "json-html", title: "JSON HTML" },
                    { id: "json-jsonp", title: "JSON JSONP" }
                ]
            },
            {
                title: "JS vs jQuery",
                lessons: [
                    { id: "jquery-selectors", title: "jQuery Selectors" },
                    { id: "jquery-html", title: "jQuery HTML" },
                    { id: "jquery-css", title: "jQuery CSS" },
                    { id: "jquery-dom", title: "jQuery DOM" }
                ]
            },
            {
                title: "JS Graphics",
                lessons: [
                    { id: "js-graphics", title: "JS Graphics" },
                    { id: "js-canvas", title: "JS Canvas" },
                    { id: "js-plotly", title: "JS Plotly" },
                    { id: "js-chartjs", title: "JS Chart.js" },
                    { id: "js-google-chart", title: "JS Google Chart" },
                    { id: "js-d3js", title: "JS D3.js" }
                ]
            },
            {
                title: "JS Examples",
                lessons: [
                    { id: "js-examples", title: "JS Examples" },
                    { id: "js-html-dom", title: "JS HTML DOM" },
                    { id: "js-html-input", title: "JS HTML Input" },
                    { id: "js-html-objects", title: "JS HTML Objects" },
                    { id: "js-html-events", title: "JS HTML Events" },
                    { id: "js-browser", title: "JS Browser" },
                    { id: "js-editor", title: "JS Editor" },
                    { id: "js-exercises", title: "JS Exercises" },
                    { id: "js-quiz", title: "JS Quiz" },
                    { id: "js-website", title: "JS Website" },
                    { id: "js-syllabus", title: "JS Syllabus" },
                    { id: "js-study-plan", title: "JS Study Plan" },
                    { id: "js-interview-prep", title: "JS Interview Prep" },
                    { id: "js-bootcamp", title: "JS Bootcamp" },
                    { id: "js-certificate", title: "JS Certificate" }
                ]
            }
        ]
    },
    react: {
        title: "React Framework",
        totalLessons: 31,
        sections: [
            {
                title: "React Tutorial",
                lessons: [
                    { id: "react-home", title: "React Home" },
                    { id: "react-intro", title: "React Intro" },
                    { id: "react-get-started", title: "React Get Started" },
                    { id: "react-upgrade", title: "React Upgrade" },
                    { id: "react-es6", title: "React ES6" },
                    { id: "react-render-html", title: "React Render HTML" },
                    { id: "react-jsx", title: "React JSX" },
                    { id: "react-components", title: "React Components" },
                    { id: "react-class", title: "React Class" },
                    { id: "react-props", title: "React Props" },
                    { id: "react-events", title: "React Events" },
                    { id: "react-conditionals", title: "React Conditionals" },
                    { id: "react-lists", title: "React Lists" },
                    { id: "react-forms", title: "React Forms" },
                    { id: "react-router", title: "React Router" },
                    { id: "react-memo", title: "React Memo" },
                    { id: "react-css-styling", title: "React CSS Styling" },
                    { id: "react-sass-styling", title: "React Sass Styling" }
                ]
            },
            {
                title: "React Hooks",
                lessons: [
                    { id: "what-is-hook", title: "What is a Hook?" },
                    { id: "usestate", title: "useState" },
                    { id: "useeffect", title: "useEffect" },
                    { id: "usecontext", title: "useContext" },
                    { id: "useref", title: "useRef" },
                    { id: "usereducer", title: "useReducer" },
                    { id: "usecallback", title: "useCallback" },
                    { id: "usememo", title: "useMemo" },
                    { id: "custom-hooks", title: "Custom Hooks" }
                ]
            },
            {
                title: "React Exercises",
                lessons: [
                    { id: "react-compiler", title: "React Compiler" },
                    { id: "react-quiz", title: "React Quiz" },
                    { id: "react-exercises", title: "React Exercises" },
                    { id: "react-syllabus", title: "React Syllabus" },
                    { id: "react-study-plan", title: "React Study Plan" },
                    { id: "react-server", title: "React Server" },
                    { id: "react-interview-prep", title: "React Interview Prep" },
                    { id: "react-certificate", title: "React Certificate" }
                ]
            }
        ]
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check login status
    checkLoginStatus();
    
    // Initialize all course topics for search
    initializeSearchTopics();
    
    // Load course progress
    loadCourseProgress();
    
    // Initialize event listeners
    initializeEventListeners();
}

function initializeEventListeners() {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.length >= 2) {
                showSearchResults();
            }
        });
    }

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSearchResults();
        }
    });

    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            } else {
                navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            }
        }
    });
}

function initializeSearchTopics() {
    allCourseTopics = [];
    
    Object.keys(courseData).forEach(courseKey => {
        const course = courseData[courseKey];
        course.sections.forEach(section => {
            section.lessons.forEach(lesson => {
                allCourseTopics.push({
                    title: lesson.title,
                    category: course.title,
                    courseId: courseKey,
                    lessonId: lesson.id,
                    url: `course.html?course=${courseKey}&lesson=${lesson.id}`
                });
            });
        });
    });
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) return;
    
    if (query.length < 2) {
        hideSearchResults();
        return;
    }
    
    const results = allCourseTopics.filter(topic =>
        topic.title.toLowerCase().includes(query) ||
        topic.category.toLowerCase().includes(query)
    ).slice(0, 10);
    
    displaySearchResults(results, resultsContainer);
    showSearchResults();
}

function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-secondary);">No results found</div>';
        return;
    }
    
    const resultsHTML = results.map(result => `
        <a href="${result.url}" class="search-result-item">
            <span class="search-result-category">${result.category}</span>
            <span class="search-result-title">${result.title}</span>
        </a>
    `).join('');
    
    container.innerHTML = resultsHTML;
}

function showSearchResults() {
    const results = document.getElementById('searchResults');
    if (results) {
        results.style.display = 'block';
    }
}

function hideSearchResults() {
    const results = document.getElementById('searchResults');
    if (results) {
        results.style.display = 'none';
    }
}

// Authentication functions
function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showUserInfo();
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function hideLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validate input
    if (!username || !password) {
        showNotification('Please enter both username and password', 'error');
        return;
    }
    
    // Simple demo authentication
    if (username === 'admin' && password === 'password') {
        currentUser = { username: username, loginTime: new Date().toISOString() };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showUserInfo();
        hideLoginModal();
        showNotification('Login successful! Welcome to CodeLearn', 'success');
        loadCourseProgress();
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        showNotification('Invalid credentials. Use admin/password for demo', 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'flex';
    showNotification('Logged out successfully!', 'success');
    loadCourseProgress();
}

function showUserInfo() {
    const userNameElement = document.getElementById('userName');
    const userInfoElement = document.getElementById('userInfo');
    const loginBtnElement = document.getElementById('loginBtn');
    
    if (userNameElement && userInfoElement && loginBtnElement) {
        userNameElement.textContent = currentUser.username;
        userInfoElement.style.display = 'flex';
        loginBtnElement.style.display = 'none';
    }
}

function loadCourseProgress() {
    Object.keys(courseData).forEach(courseKey => {
        const course = courseData[courseKey];
        const completedLessons = getCompletedLessons(courseKey);
        const progress = Math.round((completedLessons.length / course.totalLessons) * 100);
        
        // Update progress display
        const progressBar = document.getElementById(`${courseKey}-progress`);
        const progressText = document.getElementById(`${courseKey}-text`);
        const lessonCount = document.getElementById(`${courseKey}-count`);
        
        if (progressBar && progressText && lessonCount) {
            progressBar.style.width = `${progress}%`;
            
            if (currentUser) {
                progressText.textContent = `${progress}% Complete`;
                lessonCount.textContent = `${completedLessons.length}/${course.totalLessons} Lessons`;
            } else {
                progressText.textContent = 'Login to track progress';
                lessonCount.textContent = `0/${course.totalLessons} Lessons`;
                progressBar.style.width = '0%';
            }
        }
    });
}

function getCompletedLessons(courseId) {
    if (!currentUser) return [];
    
    const completed = localStorage.getItem(`${courseId}_completed_lessons`);
    return completed ? JSON.parse(completed) : [];
}

function markLessonComplete(courseId, lessonId) {
    if (!currentUser) return;
    
    const completedLessons = getCompletedLessons(courseId);
    if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem(`${courseId}_completed_lessons`, JSON.stringify(completedLessons));
        
        // Update main page progress if we're on it
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            loadCourseProgress();
        }
        
        showNotification(`Lesson "${lessonId}" marked as complete!`, 'success');
    }
}

function openCourse(courseId) {
    window.location.href = `course.html?course=${courseId}`;
}

// Notification system
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Global functions for HTML onclick handlers
window.showLoginModal = showLoginModal;
window.hideLoginModal = hideLoginModal;
window.handleLogin = handleLogin;
window.logout = logout;
window.openCourse = openCourse;
window.markLessonComplete = markLessonComplete;

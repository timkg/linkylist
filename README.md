# Description
LinkyList is a social bookmarking service which allows you to save links to boards. This application serves to
demonstrate a few techniques found in modern, JS-based web development.

# Architecture and development principles
LinkyList is a full-stack Javascript application. The server-side is built on Node.js: Express for the web app,
MongoDB and Mongoose for data persistence, and Socket.io for real-time event propagation. The
client-side is built on top of Zurb's Foundation 4 for a mobile-first, responsive front-end. Client-side logic is
powered by Backbone. I make heavy use of require.js modules to keep logic separated.

I take progressive enhancement seriously. The core service runs on small screens with Javascript disabled. Additional
 functionality and user-friendliness is layered on top of these static pages.

TDD - I use nodeunit for server-side tests, karma-runner for client-side tests.

I use jake to automate test running, code linting, and template compilation.

# Discussion of some Features

## Client-side modules
Your typical unit of client-side functionality requires Backbone Collections, Models and Views. I use modules to keep
 these units together. A module of functionality (for example viewing a board and adding links to it) is managed by
a JS file which includes all Backbone dependencies. Modules are loaded via html data-module tags. The application
looks for html elements with such a tag. When found, require.js attempts to load a file with the name of the
data-module attribute's value. If found, it calls the init() function of the exposed module. From there on,
the module is responsible for intercepting form submits, links, etc., and syncing data with the back-end.

## Template reuse
Adhering to progressive enhancement requires server-side rendering of templates. But fast,
modern browsers allow for client-side templating, reducing the amount of work the server needs to do. By using the
Jade templating system and the templatizer module, I can write my templates once, use them on the server,
and push a pre-compiled set of templates to the client, ready to be called with a model's JSON representation.

## Domain Model events
Mongoose's pre- and post-save hooks simplify event emission when domain models change. Adding socket.io to the mix
makes it really easy to notify clients when relevant models change.
# Developer Documentation for `route-titan`

This documentation covers the implementation and usage of the `Server`, `Router`, and related types and interfaces provided by the `route-titan` module. It includes examples for setting up a server, handling requests and responses, serving static files, and uploading files.

## Table of Contents

- [Developer Documentation for `route-titan`](#developer-documentation-for-route-titan)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
  - [Creating a Server](#creating-a-server)
  - [Configuring Middleware](#configuring-middleware)
    - [API](#api)
      - [`server.get(path: string, middleware: Function | Function[], callback: Function): void`](#servergetpath-string-middleware-function--function-callback-function-void)
  - [Common Middleware(Config) with npm package](#common-middlewareconfig-with-npm-package)
    - [Introduction](#introduction)
    - [Common Middleware Usage](#common-middleware-usage)
      - [`server.config`](#serverconfig)
        - [Example 1: Using `server.config` with a single middleware](#example-1-using-serverconfig-with-a-single-middleware)
        - [Example 2: Using `server.config` with multiple middlewares](#example-2-using-serverconfig-with-multiple-middlewares)
      - [`server.use`](#serveruse)
        - [Example](#example)
    - [API](#api-1)
      - [`server.config`](#serverconfig-1)
      - [`server.use`](#serveruse-1)
    - [Example](#example-1)
  - [Defining Routes](#defining-routes)
    - [Simple Routes](#simple-routes)
    - [Routes with Middleware](#routes-with-middleware)
    - [Router for Grouped Routes](#router-for-grouped-routes)
      - [Here's the complete example](#heres-the-complete-example)
  - [Handling Responses](#handling-responses)
    - [JSON Response](#json-response)
    - [HTML Response](#html-response)
    - [Text Response](#text-response)
    - [Redirect](#redirect)
    - [Error Response](#error-response)
  - [Cookies](#cookies)
    - [Example: Reading Cookies](#example-reading-cookies)
    - [Cookies Usage](#cookies-usage)
      - [Example: Setting a Cookie](#example-setting-a-cookie)
      - [Example: Reading a Cookie](#example-reading-a-cookie)
      - [Example: Deleting a Cookie](#example-deleting-a-cookie)
    - [API](#api-2)
      - [`res.cookie`](#rescookie)
      - [`req.cookies`](#reqcookies)
      - [`res.clearCookie`](#resclearcookie)
    - [Example](#example-2)
    - [API](#api-3)
      - [`res.deleteCookie`](#resdeletecookie)
      - [`req.cookies`](#reqcookies-1)
      - [`res.setCookie`](#ressetcookie)
  - [`server.use`](#serveruse-2)
    - [Signature](#signature)
    - [Usage](#usage)
      - [1. Global Middleware](#1-global-middleware)
      - [2. Middleware with Specific Path](#2-middleware-with-specific-path)
      - [3. Middleware with Route Handler](#3-middleware-with-route-handler)
      - [4. Multiple Middleware](#4-multiple-middleware)
    - [Parameters](#parameters)
    - [Example](#example-3)
  - [Dynamic Route Parameters](#dynamic-route-parameters)
    - [Introduction](#introduction-1)
    - [Dynamic Route Parameters Usage](#dynamic-route-parameters-usage)
      - [Example: Handling Dynamic Route Parameters](#example-handling-dynamic-route-parameters)
    - [API](#api-4)
      - [`server.get`](#serverget)
    - [Example](#example-4)
  - [Handling "Not Found" with `server.use`](#handling-not-found-with-serveruse)
    - [Handling "Not Found" with Middleware](#handling-not-found-with-middleware)
    - [Handling "Not Found" with a Route Handler](#handling-not-found-with-a-route-handler)
    - [Behavior](#behavior)
    - [Examples](#examples)
      - [Applying "Not Found" Middleware Globally](#applying-not-found-middleware-globally)
      - [Applying "Not Found" Route Handler to a Specific Path](#applying-not-found-route-handler-to-a-specific-path)
  - [Serving Static Files](#serving-static-files)
    - [Introduction](#introduction-2)
    - [Usage](#usage-1)
      - [Basic Usage](#basic-usage)
    - [API](#api-5)
      - [`server.static`](#serverstatic)
      - [Overloads](#overloads)
        - [`server.static`](#serverstatic-1)
    - [Example](#example-5)
    - [Notes](#notes)
  - [File Uploads](#file-uploads)
    - [Note](#note)
  - [Error Handling](#error-handling)
    - [Handling Not Found Routes](#handling-not-found-routes)
    - [Handling Specific HTTP Methods for Not Found Routes](#handling-specific-http-methods-for-not-found-routes)
    - [use `server.user()`](#use-serveruser)
    - [Notes](#notes-1)
  - [Example Project](#example-project)
  - [Summary](#summary)

---

## Setup

To get started, ensure you have installed the necessary dependencies:

```bash
npm install route-titan
```

---

## Creating a Server

First, import the necessary components and create an instance of the `Server` class:

```typescript
import { Server, FormWizard } from "route-titan";

// Create a server instance
const server = new Server();
server.config(FormWizard)
// Define routes and middleware

// Example route
server.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Configure the server to listen on a specific port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

## Configuring Middleware

You can configure middleware to handle requests before they reach your routes:

```typescript
server.config((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
```

You can add middleware functions to routes using the `server.get`, `server.post`, `server.put`, etc. methods. Middleware functions can be added individually or as an array. Here's an example:

```typescript
// Add middleware functions as an array
server.get('/example', [middleware1, middleware2], routeCallback);

// Add middleware function individually
server.get('/example', middleware1, routeCallback);
```

### API

#### `server.get(path: string, middleware: Function | Function[], callback: Function): void`

- **Parameters:**
  - `path` (string): The route path.
  - `middleware` (Function | Function[]): Middleware function(s) to be executed before the route callback.
  - `callback` (Function): The route callback function to be executed when the route is matched.

Middleware functions have access to the request and response objects and must call `next()` to pass control to the next middleware or route handler.

---

## Common Middleware(Config) with npm package

### Introduction

Middleware functions are essential in Node.js applications for processing HTTP requests. They can perform tasks such as logging, authentication, error handling, and more. This documentation provides examples of common middleware usage with the npm package..

### Common Middleware Usage

#### `server.config`

The `server.config` method is used to configure middleware for the server. You can use it to apply common middleware like CORS.

##### Example 1: Using `server.config` with a single middleware

```javascript
const corsMiddleware = require('cors');

// Apply CORS middleware using server.config
server.config(corsMiddleware);
```

##### Example 2: Using `server.config` with multiple middlewares

```javascript
const corsMiddleware = require('cors');
const helmetMiddleware = require('helmet');

// Apply multiple middlewares using server.config
server.config([corsMiddleware, helmetMiddleware]);
```

#### `server.use`

The `server.use` method is similar to `server.config` and is used to apply middleware to the server.

##### Example

```javascript
const cors = require('cors');

// Apply CORS middleware using server.use
server.use(cors());
```

### API

#### `server.config`

- **Parameters:**
  - `middlewares` (Array): An array of middleware functions to be applied to the server.

#### `server.use`

- **Parameters:**
  - `middleware` (Function): The middleware function to be applied to the server.

### Example

```javascript
const cors = require('cors');
const helmet = require('helmet');

// Using server.config with multiple middlewares
server.config([cors(), helmet()]);



// Alternatively, using server.use
server.use(cors());
// array
server.use([middleware, middleware1])
```

---

## Defining Routes

Define routes using the `get`, `post`, `put`, `delete`, `patch`, and `all` methods on the `Server` or `Router` instance. You can also use middleware for specific routes.

### Simple Routes

```typescript
server.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' });
});
```

### Routes with Middleware

You can add middleware to specific routes:

```typescript
const exampleMiddleware = (req, res, next) => {
    console.log('Middleware executed');
    next();
};

server.get('/example', exampleMiddleware, (req, res) => {
    res.text('GET Request Received!');
});
```

### Router for Grouped Routes

You can use the `Router` class to group related routes:

```typescript
const router = new Router();

router.get('/test', (req, res) => {
    res.json({ test: 345 });
});

router.get('/testing', (req, res) => {
    res.send({ xx: 34534 });
});

server.use('/api', router);
```

#### Here's the complete example

```javascript
import { Server, Router } from'route-titan';

// Create a server instance
const server = new Server();
server.config(FormWizard)

// Create a router instance
const router = new Router();

// Define routes on the router
router.get("/", (req, res) => {
    res.json({ test: 345 });
});

router.get("/testing", (req, res) => {
    res.json({});
});

// Define middleware function
const middleware1 = (req, res, next) => {
    next(); // Call next to pass control to the next middleware or the route callback
};

// Use the router to handle routes on the server
server.router('/test/', middleware1, router);
```

---

## Handling Responses

Use the methods provided by the `Response` interface to send different types of responses.

### JSON Response

```typescript
res.json({ key: 'value' });
```

### HTML Response

```typescript
res.html('<h1>Hello, world!</h1>');
```

### Text Response

```typescript
res.text('This is a plain text response.');
```

### Redirect

```typescript
res.redirect('https://example.com');
```

### Error Response

```typescript
res.error(404, 'Not Found');
```

## Cookies

### Example: Reading Cookies

Cookies are small pieces of data that are sent from a website and stored on a user's computer by the user's web browser while the user is browsing. They are commonly used for session management, user authentication, and tracking user activity. This documentation provides examples of handling cookies with the npm package..

### Cookies Usage

#### Example: Setting a Cookie

```javascript

// Set a cookie
server.get('/set-cookie', (req, res) => {
    res.cookie('username', 'john_doe', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set');
});
```

#### Example: Reading a Cookie

```javascript
// Read a cookie
server.get('/read-cookie', (req, res) => {
    const username = req.cookies.username;
    res.send(`Username: ${username}`);
});
```

#### Example: Deleting a Cookie

```javascript

server.get('/:params', (req, res) => {
    res.deleteCookie('name');
    res.json({});
});
```

### API

#### `res.cookie`

- **Parameters:**
  - `name` (string): The name of the cookie.
  - `value` (any): The value of the cookie.
  - `options` (CookieOptions): Additional options for the cookie (e.g., `maxAge`, `httpOnly`, `secure`).

#### `req.cookies`

- **Description:** An object containing the cookies sent by the client.

#### `res.clearCookie`

- **Parameters:**
  - `name` (string): The name of the cookie to be deleted.
  - `options` (CookieOptions): Additional options for the cookie (e.g., `path`, `domain`, `secure`).

### Example

```javascript

// Set a cookie
server.get('/set-cookie', (req, res) => {
    res.cookie('username', 'john_doe', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set');
});

// Read a cookie
server.get('/read-cookie', (req, res) => {
    const username = req.cookies.username;
    res.send(`Username: ${username}`);
});

// Delete a cookie
server.get('/delete-cookie', (req, res) => {
    res.deleteCookie('username');
    res.send('Cookie has been deleted');
});
```

### API

#### `res.deleteCookie`

- **Parameters:**
  - `cookieName` (string): The name of the cookie to be deleted.
  - `options` (CookieOptions): Additional options for the cookie (e.g., `path`, `domain`, `secure`, `httpOnly`, `sameSite`).

#### `req.cookies`

- **Description:** An object containing the cookies sent by the client.

#### `res.setCookie`

- **Parameters:**
  - `cookieName` (string): The name of the cookie.
  - `cookieValue` (string): The value of the cookie.
  - `options` (CookieOptions): Additional options for the cookie (e.g., `expires`, `path`, `domain`, `secure`, `httpOnly`, `sameSite`).

## `server.use`

The `server.use` method in the `route-titan` package is used to apply middleware functions and route handlers to the server. It can be used in various ways to add middleware and route handlers to specific paths or globally to the entire server.

### Signature

```typescript
server.use(...args: any[]): void
```

### Usage

#### 1. Global Middleware

Apply middleware functions globally to the entire server.

```javascript
server.use(middlewareFunction);
```

#### 2. Middleware with Specific Path

Apply middleware functions to a specific path on the server.

```javascript
server.use('/specific-path', middlewareFunction);
```

#### 3. Middleware with Route Handler

Apply middleware functions and route handlers to a specific path on the server.

```javascript
server.use('/specific-path', middlewareFunction, routeHandlerFunction);
```

#### 4. Multiple Middleware

Apply multiple middleware functions to a specific path on the server.

```javascript
server.use('/specific-path', [middlewareFunction1, middlewareFunction2], routeHandlerFunction);
```

### Parameters

- `path` (string): Optional. The path at which to apply the middleware or route handler.
- `middlewares` (Function or Function[]): One or more middleware functions to be applied.
- `callback` (Function): Optional. The route handler function to be executed when the path is matched.

### Example

```js
const router = new Router();
router.get("/", (req: Request, res: Response) => {
    res.json({ test: 345 })
})
router.get("/testing", (req: Request, res: Response) => {
    res.json({})
})
server.use('/', router)
```

```javascript
const server = new Server();
server.config(FormWizard)

// Global middleware
server.use(middlewareFunction);

// Middleware with specific path
server.use('/specific-path', middlewareFunction);

// Middleware with route handler
server.use('/specific-path', middlewareFunction, routeHandlerFunction);

// Multiple middleware with route handler
server.use('/specific-path', [middlewareFunction1, middlewareFunction2], routeHandlerFunction);
```

Here's the handling "Not Found" scenarios using the `server.use` method in the `route-titan` package:

---

## Dynamic Route Parameters

### Introduction

Dynamic route parameters allow developers to define routes with placeholders that can match various values. This documentation provides examples of using dynamic route parameters with the npm package..

### Dynamic Route Parameters Usage

#### Example: Handling Dynamic Route Parameters

```javascript

// Define a route with a dynamic parameter
server.get('/:params', (req, res) => {
    const params = req.params; // Access dynamic parameters
    res.json({ params });
});
```

### API

#### `server.get`

- **Parameters:**
  - `path` (string): The route path with dynamic parameters specified using `:` prefix.
  - `callback` (Function): The route callback function to be executed when the route is matched.

### Example

```javascript

// Define a route with a dynamic parameter
server.get('/:params', (req, res) => {
    const params = req.params; // Access dynamic parameters
    res.json({ params });
});
```

---

## Handling "Not Found" with `server.use`

#### Handling "Not Found" with Middleware

To handle "Not Found" errors using middleware, you can define a middleware function that responds with a "Not Found" message and apply it as the last middleware in the middleware chain.

```javascript
server.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
```

#### Handling "Not Found" with a Route Handler

Alternatively, you can define a route handler specifically for "Not Found" scenarios and apply it globally or to a specific path.

```javascript
server.use('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
```

### Behavior

- The middleware or route handler for "Not Found" scenarios should be applied after all other routes and middleware to ensure it captures requests that do not match any existing routes.
- It's common practice to set the HTTP status code to 404 to indicate that the requested resource was not found.
- You can customize the response body to include additional details or error messages as needed.

### Examples

#### Applying "Not Found" Middleware Globally

```javascript
server.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
```

#### Applying "Not Found" Route Handler to a Specific Path

```javascript
server.use('/not-found', (req, res) => {
    res.status(404).json({ error: 'Custom Not Found Page' });
});
```

---

## Serving Static Files

You can serve static files using the `static` method:

```typescript
server.static('/', './public');
```

### Introduction

`server.static` is a method provided by the npm package to serve static files over an HTTP server. It allows developers to easily configure routes and paths for serving static content such as HTML, CSS, JavaScript, and images.

### Usage

#### Basic Usage

```javascript
// Serve a single file at the root route
server.static('/', path.join(__dirname, 'image.png'));

// Serve a single file at a specific route
server.static('/test/', path.join(__dirname, 'image.png'));

// Serve files from a folder
server.static(path.join(__dirname, 'public'));
```

### API

#### `server.static`

- **Parameters:**
  - `route` (string): The route at which the static content will be served.
  - `path` (string): The path to the static file or folder.

#### Overloads

##### `server.static`

- **Parameters:**
  - `path` (string): The path to the static folder.

### Example

```javascript

// Serve a single file at the root route
server.static('/', path.join(__dirname, 'image.png'));

// Serve a single file at a specific route
server.static('/test/', path.join(__dirname, 'image.png'));

// Serve files from a folder
server.static(path.join(__dirname, 'public'));
```

### Notes

- Make sure to provide the correct paths to the static files or folders.
- Ensure that the server has appropriate permissions to access the files or folders.
- Declare it top of code.
  
---

## File Uploads

Handle file uploads by accessing the `file` or `files` property on the `Request` object:

```typescript
import path from 'path';
import fs from 'fs';
const server = new Server();
server.config(FormWizard)
server.static(path.join(__dirname, 'upload'));
// Example route to handle file upload
server.post('/upload', (req, res) => {
    const uploadedFile = req.file;
    if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
    }
    // Handle the uploaded file here, for example, save it or process it
    readFile('/uploads', (err, data) => {
        const uploadedFile = req.file;
        if (!uploadedFile) {
            return res.status(400).send('No file uploaded.');
        }
        const newPath = path.join(__dirname, 'uploads', uploadedFile.filename);
        writeFile(newPath, uploadedFile?.buffer, err => {
            if (err) throw err;
            console.log('File saved successfully:', newPath);
            res.send('File uploaded and processed successfully.');
        });
    });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

```

### Note

Please add `server.config(FormWizard)` for Parse body

---

## Error Handling

Catch all unmatched routes with a wildcard route and send a 404 response:

```typescript
server.use('*', (req, res) => {
    res.error(404, 'Not Found');
});
```

### Handling Not Found Routes

To handle requests for routes that are not found, you can use the `server.all` method:

```javascript
server.all("*", (req, res) => {
    res.json({ success: false });
});
```

### Handling Specific HTTP Methods for Not Found Routes

To handle specific HTTP methods for routes that are not found, you can use the respective methods (`get`, `post`, `put`, etc.):

```javascript
server.get("*", (req, res) => {
    res.json({});
});

server.post("*", (req, res) => {
    res.json({});
});

server.put("*", (req, res) => {
    res.json({});
});
```

### use `server.user()`

same as `server.all()`

```js
server.use("*", (req, res) => {
    return res.html("Not Found")
})
```

with middleware:

```js
server.use(middleware, (req, res) => {
    return res.html("Not Found")
})
```

### Notes

- Make sure to provide the correct paths to the static files or folders.
- Ensure that the server has appropriate permissions to access the files or folders.

---

## Example Project

Here is an example project that combines all the concepts discussed:

```typescript
import { Server, FormWizard, Request, Response, Router } from "route-titan";
import path from 'path';
import fs from 'fs';

const server = new Server();
server.config(FormWizard);

// Middleware for logging requests
server.config((req: Request, res: Response, next: () => void) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from the 'public' directory
server.static('/', path.join(__dirname, 'public'));

// Simple GET route
server.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello, world!' });
});

// Route with middleware
const exampleMiddleware = (req: Request, res: Response, next: () => void) => {
    console.log('Middleware executed');
    next();
};

server.get('/example', exampleMiddleware, (req: Request, res: Response) => {
    res.text('GET Request Received!');
});

// Router for grouped routes
const router = new Router();

router.get('/test', (req: Request, res: Response) => {
    res.json({ test: 345 });
});

router.get('/testing', (req: Request, res: Response) => {
    res.send({ xx: 34534 });
});

server.use('/api', router);

// File upload route
server.post('/upload', (req: Request, res: Response) => {
    const uploadedFile = req.file;
    if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, 'uploads', uploadedFile.filename);
    fs.writeFile(filePath, uploadedFile.buffer, (err) => {
        if (err) {
            return res.error(500, 'Failed to save file.');
        }
        res.send('File uploaded and saved successfully.');
    });
});

// Catch-all route for unmatched paths
server.use('*', (req: Request, res: Response) => {
    res.html('Not Found');
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

## Summary

This documentation provides an overview of how to implement a web server using the `route-titan` module, including handling different types of responses, serving static files, handling file uploads, and managing routes and middleware. For further customization and advanced use cases, refer to the module's API documentation.

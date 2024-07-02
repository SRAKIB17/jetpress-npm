### JetPress

**JetPress** is a high-performance, flexible, and extensible web server framework designed to streamline web development. Inspired by the robustness of Express and the speed of modern web frameworks, JetPress aims to provide developers with an efficient and versatile platform for building web applications and APIs.

#### Key Features

1. **High Performance**: Built with performance in mind, JetPress ensures rapid request handling and efficient resource management.
2. **Flexible Routing**: Supports both static and dynamic routing, allowing developers to easily define routes and handle requests.
3. **Static File Serving**: Effortlessly serve static files from specified directories, making it ideal for serving HTML, CSS, JavaScript, images, and other assets.
4. **Middleware Support**: Integrate custom middleware to handle request preprocessing, logging, authentication, and other tasks.
5. **Built-in Body Parser**: Automatically parses incoming request bodies, supporting JSON, URL-encoded, and multipart form data. This includes built-in support for handling file uploads.
6. **File Uploader**: Seamlessly handle file uploads, with easy access to uploaded files through the request object.
7. **Cookie Parser**: Built-in support for parsing cookies, allowing for easy manipulation and management of cookies within your application.
8. **URL Parser**: Comprehensive URL parsing capabilities, extracting query parameters, path variables, and other URL components.
9. **Modular Design**: Promotes a modular approach, enabling developers to organize their codebase efficiently.
10. **TypeScript Support**: Written in TypeScript, providing strong type definitions and interfaces, enhancing development experience and reducing runtime errors.
11. **Extensible**: Easily extend JetPress with additional features and plugins as needed.

## [Full documentation](<https://github.com/SRAKIB17/jetpress-npm?tab=readme-ov-file#developer-documentation-for-jetpress>)

#### Example Use Case

```typescript
import { readFile, writeFile } from "fs";
import { Request, Response,FormWizard, Router, Server } from "jetpress";
import path from "path";

const server = new Server();

// Middleware for parsing form data
server.use(FormWizard);

// Static file serving
server.static('/public', './public');
server.static('/uploads', './uploads');

// Define routes
server.get('/', (req: Request, res: Response) => {
    res.html('<h1>Welcome to JetPress!</h1>');
});

server.post('/upload', (req: Request, res: Response) => {
    const uploadedFile = req.file;
    if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
    }

    const newPath = path.join(__dirname, 'uploads', uploadedFile.filename);
    writeFile(newPath, uploadedFile.buffer, err => {
        if (err) throw err;
        console.log('File saved successfully:', newPath);
        res.send('File uploaded and processed successfully.');
    });
});

// Example route using router
const router = new Router();
router.get("/example", (req: Request, res: Response) => {
    res.json({ message: "Hello from the router!" });
});
server.use('/api', router);

// Handle all other routes with a 404
server.use("*", (req: Request, res: Response) => {
    res.html("Not Found");
});

// Start the server
server.listen(3000, () => {
    console.log('JetPress server running at http://localhost:3000');
});
```

With **JetPress**, you can build modern web applications quickly and efficiently, leveraging its high performance, flexible routing, and comprehensive feature set. Whether you're building a simple website or a complex API, JetPress has the tools you need to succeed.

#### Contributing

If you want to encourage contributions, include guidelines for contributing to the project. This may include information on how to report issues or submit pull requests.

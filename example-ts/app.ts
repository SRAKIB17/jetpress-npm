import { writeFile } from "fs";
import { FormWizard, Request, Response, Router, Server } from "jetpress";
import path from "path";

const server = new Server();

// Middleware for parsing form data
server.use(FormWizard);

// Static file serving
server.static('/', './public');
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
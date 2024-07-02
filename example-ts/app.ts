import { writeFile } from 'fs';
import path from 'path';
import { Request, Response, Router, Server } from 'jetpress'; // Import the CommonJS module

const server = new Server();

// Static serve files:
server.static('/', './test');
server.static('/', './uploads');

// Example GET route
server.get('/', (req, res) => {
    return res.json({});
});

const router = new Router();
server.use('/all', [(req, res, next) => {
    next();
}]);

router.get("/", (req: Request, res: Response) => {
    res.json({ test: 345 });
});
router.get("/testing", (req: Request, res: Response) => {
    res.send({ xx: 34534 });
});
server.use('/', router);

server.post('/upload', (req, res) => {
    const uploadedFile = req.file;
    if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
    }
    // Handle the uploaded file here, for example, save it or process it
    const newPath = path.join(__dirname, 'uploads', uploadedFile.filename);
    writeFile(newPath, uploadedFile.buffer, (err) => {
        if (err) throw err;
        console.log('File saved successfully:', newPath);
        res.send('File uploaded and processed successfully.');
    });
});

server.all('/all', (req, res) => {
    const x = req.file;
    return res.json({ x: "x.buffer" });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

server.use("*", (req, res) => {
    return res.html("Not Found");
});

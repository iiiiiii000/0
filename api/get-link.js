export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const filename = req.query.file;

    if (!filename) {
        return res.status(400).send('Missing file parameter');
    }

    try {
        const githubUrl = `https://raw.githubusercontent.com/th1mimik/key/main/${filename}`;
        const response = await fetch(githubUrl);

        if (!response.ok) {
            return res.status(404).send('File not found');
        }

        const content = await response.text();
        return res.status(200).send(content);
    } catch (error) {
        return res.status(500).send('Error');
    }
}
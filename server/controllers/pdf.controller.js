const pdfCtrl = {};
const { jsPDF } = require("jspdf");
var imageDataURI = require('image-data-uri');
var fs = require('fs');
const path = require('path');

var data = JSON.parse(fs.readFileSync('./assets/data.json', 'utf8'));

pdfCtrl.getPdf = async(req, res) => {

    try {
        if (req.params.trackId) {
            var trackId = req.params.trackId;

            const start = Date.now();
            var pdfName = start + "-result.pdf";

            //Default export is a4 paper, portrait, using millimeters for units
            const doc = new jsPDF({
                unit: "mm",
                format: [215.90, 279.40]
            });

            if (data.tracks.length < trackId) {
                //TODO: Add Validation for parameters
            }

            var result = {
                fileName: `${data.tracks.length}`,
                trackId: `${trackId}`
            };

            res.status(200).json(result);

            var title = data.tracks[trackId].title;
            var sentences = data.tracks[trackId].p;

            var result = {
                fileName: `${pdfName}`,
                trackId: `${trackId}`
            };

            //Build PDF
            imageDataURI.encodeFromFile('./assets/logo.png').then(imgRes => {
                doc.addImage(imgRes, 'PNG', 31, 10, 44, 60);

                doc.addFont("./assets/fonts/Angelina.ttf", "Angelina", "regular");
                doc.setFont("Angelina", "regular"); // set font
                doc.setTextColor(35, 31, 32);
                doc.setFontSize(20);
                doc.text("Angelina Font", 145, 32);

                doc.addFont("./assets/fonts/Verdana.ttf", "Verdana", "regular");
                doc.setFont("Verdana", "regular"); // set font
                doc.setFontSize(32);
                doc.text("Welcome:", 32, 87);

                doc.setTextColor(0, 98, 255);
                doc.setFontSize(30);
                doc.text(title, 32, 100);

                doc.setTextColor(35, 31, 32);
                doc.setFontSize(10);
                doc.setLineHeightFactor(1.4);

                //TODO: Add sentences from p variable
                for (var i = 0; i < sentences.length; i++) {
                    doc.text(sentences[i], 32, 120 + (i * 6));
                }

                //Paint rectangle
                doc.setFillColor(243, 243, 243);
                doc.rect(32, 240, 160, 8, 'F'); //Fill and Border

                /* CTA (Call to action) */
                doc.setFontSize(10);
                doc.setLineHeightFactor(1.2);
                doc.setTextColor(0, 98, 255);
                doc.textWithLink("Leran more about dynamic PFD", 34, 245, { url: "https://www.google.com" });


                //Footer
                doc.setFontSize(7);
                doc.setTextColor(140, 140, 140);
                doc.text("Node Dynamic PDF  |   © Copyright 2020.", 32, 265);

                imageDataURI.encodeFromFile('./assets/charts/chart-2011.jpg').then(chartRes => {
                    /* 2nd Page */
                    doc.addPage();

                    doc.setTextColor(23, 23, 23);
                    doc.setFontSize(7);
                    doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a velit sollicitudin, tristique ante ac, rhoncus mauris. Sed suscipit aliquam.", 32, 20);
                    doc.text("Proin placerat urna nulla, sollicitudin sollicitudin metus sodales at. Aenean suscipit luctus commodo. Ut pharetra nec odio feugiat.", 32, 24);
                    doc.text("ultricies ex convallis quis. Nunc magna ante, efficitur non odio at, imperdiet dapibus sem. Nulla molestie sagittis suscipit. Ut eget.", 32, 28);
                    doc.text("Sed venenatis efficitur odio et commodo. Maecenas fermentum nunc lacus, ac venenatis enim hendrerit sed. Cras semper libero sed.", 32, 32);

                    doc.addImage(chartRes, 'JPG', 32, 40, 115.6, 80);

                    //Footer
                    doc.setTextColor(140, 140, 140);
                    doc.setFontSize(7);
                    doc.text("Node Dynamic PDF  |   © Copyright 2020.", 32, 265);

                    //Safe PDF
                    doc.save("public/pdfs/" + pdfName);

                    const pdfFileName = `${__dirname}/public/pdfs/${pdfName}`;
                    res.download(pdfFileName); // Set disposition and send it.

                    //Delete PDF history files
                    const directory = `${__dirname}/public/pdfs/`;

                    fs.readdir(directory, (err, files) => {
                        if (err) throw err;

                        for (const file of files) {
                            if (file != pdfName) {
                                fs.unlink(path.join(directory, file), err => {
                                    if (err) throw err;
                                });
                            }
                        }
                    });

                }); //End add Chart

            }); //End add Image (logo)

            //res.status(200).json(result);

        } else {
            success = {
                "message": "Invalid request, missing parameters",
                "success": false
            };

            res.status(200).json(success);
        }

    } catch (e) {
        res.status(500).send(e.message);
    }

}

module.exports = pdfCtrl;
const fs = require('fs');

const requestHandler = (req, res) => {
        const url = req.url;
        const method = req.method;

        if (url === '/') {
            res.setHeader('Content-Text', 'text/html');
            res.write('<html>');
            res.write('<head><title>La chocolaterie</title></head>')
            res.write('<body><h1>La chocolaterie de Claret</h1><br> <p>Cumque pertinacius ut legum gnarus accusatorem flagitaret atque sollemnia, doctus id Caesar libertatemque superbiam ratus tamquam obtrectatorem audacem excarnificari praecepit, qui ita evisceratus ut cruciatibus membra deessent, inplorans caelo iustitiam, torvum renidens fundato pectore mansit inmobilis nec se incusare nec quemquam alium passus et tandem nec confessus nec confutatus cum abiecto consorte poenali est morte multatus. et ducebatur intrepidus temporum iniquitati insultans, imitatus Zenonem illum veterem Stoicum qui ut mentiretur quaedam laceratus diutius, avulsam sedibus linguam suam cum cruento sputamine in oculos interrogantis Cyprii regis inpegit.</p>');
            res.write('<h3>Vous souhaitez apporter des ameliorations ?</h3>');
            res.write('<p>Notez les dans le formulaire, elles nous serons transmisent</p>');
            res.write('<form action="/amelioration" method="POST"><input type="text" name="message"><button type="submit">Envoyer</button></body>');
            res.write('</html>');
            return res.end();
        }


        if (url === '/amelioration') {
            const table = [];
            req.on('data', (chunk) => {
                table.push(chunk);
            });



            return req.on('end', () => {
                const parsedTable = Buffer.concat(table).toString('utf-8');
                const message = parsedTable.split('=')[1];
                // fs.writeFile('message.txt', message, (err) => {
                //     res.statusCode = 302;
                //     // res.setHeader('location', '/');
                //     return res.end();
                // });

                // res.setHeader('Content-Text', 'text/html');
                res.write('<html>');
                res.write('<head><title>Les ameliorations</title></head>')
                res.write('<body><h1>Les ameliorations</h1>');
                res.write('<table><tr><td>' + message + '</td></tr></table>');
                res.write('<a href="./images"><input type="button" value="voir les photos"></a></body>');
                res.write('</html>');
                return res.end();
            })
        }


        if (url === '/images') {
            const table = [];
            req.on('data', (chunk) => {
                table.push(chunk);
            });


            return req.on('end', () => {
                    const parsedTable = Buffer.concat(table).toString('utf-8');
                    const message = parsedTable.split('=')[1];
                    fs.writeFile('photo.txt', message, (err) => {
                        res.statusCode = 302;
                        // res.setHeader('location', '/');
                        return res.end();
                    });

                    res.setHeader('Content-Text', 'image/jpeg');
                    res.write('<html>');
                    res.write('<head><title>Les photos</title></head>')
                    res.write('<body><h1>Les photos</h1>');
                    res.write('<form action="/images" method="POST"><input type="text" name="message"><button type="submit">Envoyer</button></body>');
                    res.write('<img src="' + message + '" alt="choco">');
                    res.write('<h3>Secret de fabrication</h3>');
                    res.write('<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrJ9-uanFzvccBbsH__OYAHVyt4A-zswaLNb1NhJiyI6YQv4UE" alt="choco">');

                    res.write('<p>Saepissime igitur mihi de amicitia cogitanti maxime illud considerandum videri solet, utrum propter imbecillitatem atque inopiam desiderata sit amicitia, ut dandis</p></body>')
                    res.write('</html>');
                    return res.end();


                });
            };
        };

        module.exports = requestHandler;
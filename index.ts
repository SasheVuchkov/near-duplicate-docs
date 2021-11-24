import fs from "fs";
import path from 'path';
import readline from 'readline';
import {makeFinder} from "./src/NearDuplicatesFinder";

    const auditor = makeFinder({minSimilarity: 0.01, shinglesSize: 5, shinglesType: 'word', signatureLength: 100, rowsPerBand: 5});

    const process = async() => {

        let count = 0;
    try {

        const fileStream = fs.createReadStream(path.join(__dirname, '..', 'datasets', 'test.ft.txt'));

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.

        for await (const line of rl) {
            // Each line in input.txt will be successively available here as `line`.

            const ln = line.replace(/__label__[0-9] /gi, '');

            await auditor.add(`review${count}`, ln);

            count += 1;
            //console.log(count);

            if (count == 321 || count == 673) {
                console.log(ln, '<===>');
            }

            if (count > 1000) {
               break;
            }
        }

    } catch (err) {
        console.error(err)
    }

    await auditor.start();

    auditor.on('found_candidates', (candidate) => console.log(candidate));

    if (auditor.hasErrors()) {
        console.log(auditor.getErrors());
    }

}

void process();
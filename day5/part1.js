const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');
// const input = fs.readFileSync('./testinput.txt', 'utf-8');

const Part1 = () => {
    const parsedInput = input.split('').filter(i => (i !== '' && i !== '\n'));
    let purgedPolymer = getPurgedPolymer(parsedInput);

    try {
        console.assert((purgedPolymer.length === 10766));
    } catch (e) {
        console.warn('incorrect: answer should be 10');
    }

    return purgedPolymer.length;

    function getPurgedPolymer(polymer) {
        let isPurging = true;
        let newPolymer = [...polymer];

        while(isPurging) {
            isPurging = false;

            for (let i = newPolymer.length - 2; i >= 0; --i) {
                if (i !== newPolymer.length - 1) {
                    if(getShouldPurge(newPolymer[i], newPolymer[i + 1])) {
                        newPolymer.splice(i, 2);
                        if (i == newPolymer.length) {
                            --i;
                        }
                    }
                }
            }
        }

        return newPolymer.join('');;
    }

    function getShouldPurge(pol1, pol2) {
        const isSameLetter = (pol1.toLowerCase() === pol2.toLowerCase());

        if (isSameLetter) {
            if (pol1 === pol2) {
                return false;
            }

            return true;
        }

        return false;
    }

    function purge(polymer, purgeIndexes) {
        return polymer.filter((val, i) => {
            return purgeIndexes.indexOf(i) === -1;
        });
    }
};

module.exports = Part1;

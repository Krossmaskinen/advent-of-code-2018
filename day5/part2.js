const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');
// const input = fs.readFileSync('./testinput.txt', 'utf-8');

const Part2 = () => {
    const parsedInput = input.split('').filter(i => (i !== '' && i !== '\n'));
    let shortestPolymer = getShortestPolymer(parsedInput);

    return shortestPolymer.length;

    function getShortestPolymer(polymer) {
        let units = getUnits(polymer);
        let purgedPolymers = [];

        units.forEach(unit => {
            let prePurgedPolymer = polymer.filter(u => u.toLowerCase() !== unit);

            purgedPolymers.push(getPurgedPolymer(prePurgedPolymer));
            console.log('pre purged with', unit);
        });

        return purgedPolymers.sort((p1, p2) => p1.length - p2.length)[0];
    }

    function getUnits(polymer) {
        let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        return alphabet.filter(letter => {
            return polymer.indexOf(letter) !== -1;
        });
    }

    function getPurgedPolymer(polymer) {
        let isPurging = true;
        let newPolymer = [...polymer];
        let purgeIndexes = [];
        let jumpSize = 1;

        while (isPurging) {
            isPurging = false;
            jumpSize = 1;

            for (let i = 0; i < newPolymer.length; i += jumpSize) {
                if (i !== newPolymer.length - 1) {
                    if (getShouldPurge(newPolymer[i], newPolymer[i + 1])) {
                        purgeIndexes.push(i, i + 1);
                        // skip next index if this and the next one should be purged
                        jumpSize = 2;
                    }
                }
            }

            if (purgeIndexes.length) {
                newPolymer = purge(newPolymer, purgeIndexes);
                purgeIndexes = [];
                isPurging = true;
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

module.exports = Part2;

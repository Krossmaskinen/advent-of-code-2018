const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const Part1 = () => {
    const parsedInput = input.split('\n').filter(i => i !== '');
    let noOfDoubles = 0;
    let noOfTriplets = 0;

    parsedInput.forEach(boxId => {
        const hasDouble = hasMultiple(boxId, 2);
        const hasTriple = hasMultiple(boxId, 3);

        if (hasDouble) {
            ++noOfDoubles;
        }
        if (hasTriple) {
            ++noOfTriplets;
        }
    });

    return noOfDoubles * noOfTriplets;

    function hasMultiple(boxId, count) {
        // save all characters with a counter in an object
        const characters = boxId.split('');
        const counters = {};

        characters.forEach(char => {
            if (counters[char]) {
                counters[char]++;
            } else {
                counters[char] = 1;
            }
        });

        return Object.keys(counters).find(c => counters[c] === count);
    }
};

module.exports = Part1;

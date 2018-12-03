const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const Part2 = () => {
    const parsedInput = input.split('\n').filter(t => t !== '');
    const targetBoxId = findMatchingIds(parsedInput);

    return targetBoxId;

    function findMatchingIds(boxIds) {
        let match;
        let result;

        for (let i = 0; i < (boxIds.length - 1); ++i) {
            for (let k = (i + 1); k < boxIds.length; ++k) {
                match = compareIds(boxIds[i], boxIds[k]);

                if (match !== -1) {
                    result = boxIds[i].split('');

                    result.splice(match, 1);
                    result = result.join('');

                    return result;
                }
            }
        }

        return false;
    }

    function compareIds(id1, id2) {
        const list1 = id1.split('');
        const list2 = id2.split('');
        let noOfDiffs = 0;
        let diffIndex = -1;

        for (let i = 0; i < list1.length; ++i) {
            const char1 = list1[i];
            const char2 = list2[i];

            if (char1 !== char2) {
                diffIndex = i;
                ++noOfDiffs;

                if (noOfDiffs > 1) {
                    return -1;
                }
            }
        }

        return diffIndex;
    }
};

module.exports = Part2;

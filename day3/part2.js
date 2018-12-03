const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');
// const input = fs.readFileSync('./test-input-1.txt', 'utf-8');

const Part2 = () => {
    const parsedInput = input.split('\n').filter(r => r !== '');
    let grid = {};
    let overlappingCoords = {};
    let overlapCounter = 0;
    let noOverlaps = {};

    populateGrid(parsedInput);

    const noOfOverlaps = getNumberOfOverlaps(overlappingCoords);

    checkOverlaps(noOfOverlaps);

    printGrid();
    console.log('counter', overlapCounter);
    console.log('no overlaps', noOverlaps);

    return noOfOverlaps;

    function populateGrid(rawPatterns) {
        rawPatterns.forEach(p => {
            const id = getId(p);
            const offset = getOffset(p);
            const size = getSize(p);
            const maxX = offset[0] + size[0];
            const maxY = offset[1] + size[1];
            let hasOverlap = false;

            for (let y = offset[1]; y < maxY; ++y) {
                for (let x = offset[0]; x < maxX; ++x) {
                    grid[y] = grid[y] || {};

                    if (grid[y][x]) {
                        overlappingCoords[y] = overlappingCoords[y] || {};
                        overlappingCoords[y][x] = true;

                        hasOverlap = true;

                        delete noOverlaps[grid[y][x]];

                        if (grid[y][x] !== '#') {
                            ++overlapCounter;
                        }

                        grid[y][x] = '#';
                    } else {
                        grid[y][x] = id;
                    }
                }
            }

            if (!hasOverlap) {
                noOverlaps[id] = true;
            }
        });
    }

    function getNumberOfOverlaps(overlaps) {
        let noOfOverlaps = 0;

        Object.keys(overlaps).forEach(key => {
            noOfOverlaps += Object.keys(overlaps[key]).length;
        });

        return noOfOverlaps;
    }

    function printGrid() {
        let printG = '';
        const maxX = Object.keys(grid).reduce((prev, cur) => {
            return cur > prev ? cur : prev;
        }, 0);
        const maxY = Object.keys(grid).length;

        for (let y = 0; y <= maxY; ++y) {
            if (!grid[y]) {
                grid[y] = Array(Number(maxX)).fill('*');
                printG += grid[y].join('');
            } else {
                for (let x = 0; x <= maxX; ++x) {
                    printG += grid[y][x] || '*';
                }
            }

            printG += '\n';
        }

        fs.writeFile('output.txt', printG, () => {});
    }

    function checkOverlaps() {
        if (noOfOverlaps <= 117175) {
            console.log('too low');
        } else if (noOfOverlaps >= 135748) {
            console.log('too high');
        } else {
            console.log('could be right');
        }
    }

    function getId(pattern) {
        return pattern
            .split('@')[0]
            .trim()
            .split('#')[1];
    }

    function getOffset(pattern) {
        return pattern
            .split('@')[1]
            .split(':')[0]
            .trim()
            .split(',')
            .map(Number);
    }

    function getSize(pattern) {
        return pattern
            .split(':')[1]
            .trim()
            .split('x')
            .map(Number);
    }
};

module.exports = Part2;

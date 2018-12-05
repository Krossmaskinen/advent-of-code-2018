(() => {
    const Part1 = require('./part1');
    const Part2 = require('./part2');
    const main = () => {
        console.time('part1');
        const result1 = Part1();
        console.log('part1', result1);
        console.timeEnd('part1');

        // console.time('part2');
        // const result2 = Part2();
        // console.log('part2', result2);
        // console.timeEnd('part2');
    };

    main();
})();

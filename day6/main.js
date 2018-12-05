(() => {
    const Part1 = require('./part1');
    const Part2 = require('./part2');
    const main = () => {
        console.time('part1 executed in');
        const result1 = Part1();
        console.log('part1 answer', result1);
        console.timeEnd('part1 executed in');

        // console.time('part2 executed in');
        // const result2 = Part2();
        // console.log('part2 answer', result2);
        // console.timeEnd('part2 executed in');
    };

    main();
})();

const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const Part2 = () => {
    const parsedInput = input.split('\n').filter(t => t !== '').map(t => Number(t));
    // const parsedInput = [+1, -1];
    // const parsedInput = [+7, +7, -2, -7, -4];

    return getFrequencyFromInput(0, parsedInput);

    function getFrequencyFromInput(startFrequency, frequencyInput) {
        let newFrequency = startFrequency;
        let frequencyHistory = [startFrequency];
        const lowestFrequencyChange = frequencyInput.reduce((prev, cur) => {
            return cur < 0 ? prev + cur : prev;
        }, 0);

        console.log('low', lowestFrequencyChange);

        for (let i = 0; i < frequencyInput.length; ++i) {
            const freq = frequencyInput[i];

            newFrequency += freq;

            if (frequencyHistory.some(f => f === newFrequency)) {
                return newFrequency;
            }

            frequencyHistory.push(newFrequency);

            // loop until a double hit frequency is found
            if (i === (frequencyInput.length - 1)) {
                frequencyHistory = cleanHistory(frequencyHistory, newFrequency, lowestFrequencyChange);
                i = -1;
            }
        }
    }

    function cleanHistory(history, currentFrequency, lowestFrequencyChange) {
        return history.filter(f => f >= (currentFrequency - lowestFrequencyChange));
    }
};

module.exports = Part2;

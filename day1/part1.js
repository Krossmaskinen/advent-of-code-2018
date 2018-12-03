const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const Part1 = () => {
    const parsedInput = input.split('\n');

    return getFrequencyFromInput(0, parsedInput);

    function getFrequencyFromInput(startFrequency, frequencyInput) {
        let newFrequency = startFrequency;

        frequencyInput.forEach(freq => {
            newFrequency += Number(freq);
        });

        return newFrequency;
    }
}

module.exports = Part1;

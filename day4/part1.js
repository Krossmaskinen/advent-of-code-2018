const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');
// const input = fs.readFileSync('./testinput1.txt', 'utf-8');

const Part1 = () => {
    let splitInput = input.split('\n').filter(i => i !== '');
    let entries = parseEntries(splitInput);
    let mostTiredGuardId;
    const guards = {};

    entries = updateEntryIds(entries);

    loadGuards(guards, entries);

    mostTiredGuardId = getMostTiredGuardId(guards);

    return getGuardMultiplier(mostTiredGuardId, guards);

    function parseEntries(entries) {
        entries = entries.map(entry => {
            let time = getTime(entry);
            let state = getState(entry);
            let newEntry = {
                time,
                state,
                raw: entry
            };

            return newEntry;
        });

        return sortEntries(entries);
    }

    function loadGuards(guards, entries) {
        Object.keys(guards).forEach(guardId => {
            let guardEntries = entries.filter(e => e.id === guardId);
            let sleepingTime = 0;
            let sleepingMinutes = {};

            for (let i = 0; i < guardEntries.length; ++i) {
                let prevTime;
                let current = guardEntries[i];
                let startTime = current.time.getMinutes();

                if (i > 0) {
                    prevTime = guardEntries[i - 1].time.getMinutes();
                }

                if (current.state === 'awake') {
                    sleepingTime += (startTime - prevTime);

                    updateSleepingMinutes(sleepingMinutes, prevTime, startTime);
                }
            }

            guards[guardId].sleepingTime = sleepingTime;
            guards[guardId].sleepingMinutes = sleepingMinutes;
            guards[guardId].mostSleptMinute = Object.keys(sleepingMinutes).reduce((prev, cur) => {
                if (prev) {
                    return (+sleepingMinutes[cur] > +sleepingMinutes[prev]) ? cur : prev;
                }

                return cur;
            }, null);
        });
    }

    function getGuardMultiplier(guardId, guards) {
        return +guardId * +guards[guardId].mostSleptMinute;
    }

    function updateSleepingMinutes(sleepingMinutes, start, end) {
        for (let i = start; i < end; ++i) {
            if (sleepingMinutes[i]) {
                sleepingMinutes[i]++;
            } else {
                sleepingMinutes[i] = 1;
            }
        }
    }

    function getMostTiredGuardId(guards) {
        let guardId = Object.keys(guards).sort((prev, cur) => {
            if (guards[cur].sleepingTime > guards[prev].sleepingTime) {
                return 1;
            }

            return -1;
        })[0];

        return guardId;
    }

    function updateEntryIds(entries) {
        let activeId;
        let updatedEntries = entries.map(entry => {
            if (entry.raw.indexOf('Guard') !== -1) {
                activeId = getId(entry);
                guards[activeId] = {};
            }

            entry.id = activeId;

            return entry;
        });

        return updatedEntries;
    }

    function sortEntries(entries) {
        return entries.sort((entryA, entryB) => {
            if (entryA.time > entryB.time) {
                return 1;
            } else if (entryA.time < entryB.time) {
                return -1;
            }

            return 0;
        });
    }

    function getTime(entry) {
        return new Date(entry.match(/\[.+\]/)[0].split('[')[1].split(']')[0]);
    }

    function getState(entry) {
        if (entry.indexOf('Guard') !== -1) {
            return 'start';
        } else if (entry.indexOf('asleep') !== -1) {
            return 'sleeping';
        }

        return 'awake';
    }

    function getId(entry) {
        return entry.raw.match(/\#\d+/)[0].split('#')[1];
    }

};

module.exports = Part1;

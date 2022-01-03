const geocode = (address) => {
    if (address === 'error') {
        return { error: 'Could not geocode this address.' }
    }

    const temperature = Math.floor(Math.random() * 100);
    const chanceOfRain = Math.floor(Math.random() * 100);
    return { current: temperature, forecast: `${chanceOfRain}% change of rain`, location: address };
}

module.exports = geocode;

/**
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure  
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values) {
    if (typeof input !== 'object' || typeof values !== 'object' || input === null || values === null) {
        throw new Error('InvalidType');
    }

    if (Object.keys(input).length === 0) {
        return '';
    }

    function processObject(obj) {
        if (typeof obj === 'string') {
            return obj.replace(/\$\{([^}]+)\}/g, (match, key) => values[key] || '');
        }

        if (typeof obj === 'object') {
            return Object.entries(obj)
                .map(([key, value]) => `<${key}>${processObject(value)}</${key}>`)
                .join('');
        }

        return '';
    }

    return processObject(input);
}

module.exports = {
    render
};

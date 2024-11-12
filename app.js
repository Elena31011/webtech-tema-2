/**
 * The function renders an object to a tagged string and performs token substitution
 * @param {object} input - A JavaScript object representing a hierarchical structure
 * @param {object} values - A list of key-value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values) {
    if (typeof input !== 'object' || typeof values !== 'object' || input === null || values === null) {
        throw new Error('InvalidType');
    }

    if (Object.keys(input).length === 0) {
        return '';
    }

    function processElement(element) {
        if (typeof element === 'string') {
            return element.replace(/\$\{(\w+)\}/g, (_, token) => values[token] || '');
        } else if (typeof element === 'object' && element !== null) {
            return Object.entries(element)
                .map(([tag, content]) => `<${tag}>${processElement(content)}</${tag}>`)
                .join('');
        }
        return '';
    }

    return processElement(input);
}

module.exports = {
    render
};

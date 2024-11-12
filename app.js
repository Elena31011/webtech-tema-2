/**
 * The function renders an object to a tagged string and performs token substitution
 * @param {object} input - A JavaScript object representing a hierarchical structure
 * @param {object} values - A list of key-value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values) {
    // 1. Check if input is an object and values is an object; otherwise throw "InvalidType" exception
    if (typeof input !== 'object' || typeof values !== 'object' || input === null || values === null) {
        throw new Error('InvalidType');
    }

    // 2. Return an empty string if input is an empty object
    if (Object.keys(input).length === 0) {
        return '';
    }

    // 3. Recursive function to process each element in the input object
    function processElement(element) {
        if (typeof element === 'string') {
            // Replace tokens with corresponding values
            return element.replace(/\$\{(\w+)\}/g, (_, token) => values[token] || '');
        } else if (typeof element === 'object' && element !== null) {
            // Recursive case: render nested structures
            return Object.entries(element)
                .map(([tag, content]) => `<${tag}>${processElement(content)}</${tag}>`)
                .join('');
        }
        return '';
    }

    // Start the recursive rendering process on the root input
    return processElement(input);
}

module.exports = {
    render
};

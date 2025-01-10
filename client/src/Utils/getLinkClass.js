/**
 * Returns a CSS class string for styling a link based on the current location path.
 * If the current location path matches the provided path, the link will be styled differently.
 * Prevents the redundancy of code
 *
 * @param {object} location - The location object containing the current pathname.
 * @param {string} path - The path to compare with the current location pathname.
 * @returns {string} A string representing the CSS classes to be applied to the link.
 *                   The classes will style the link differently if the current pathname
 *                   matches the provided path, indicating it is the active link.
 */
const getLinkClass = (location, path) => {
    return location.pathname === path
        ? "font-bold cursor-pointer border border-stone-600 rounded-full p-2 bg-stone-700 text-white"
        : "font-bold cursor-pointer border border-stone-600 rounded-full p-2 bg-white hover:bg-stone-700 hover:text-white";
};

export default getLinkClass;

const React = require("react");
const { default: Layout } = require("./src/components/Layout/Layout");

// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>;
};

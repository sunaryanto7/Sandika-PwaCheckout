const internalDeleteSession = async (parent, args, context) => {
    const { req } = context;
    req.session = null;
    return {
        result: true,
    };
};

module.exports = internalDeleteSession;

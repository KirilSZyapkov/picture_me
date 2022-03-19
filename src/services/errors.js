module.exports = (err) => {
    let message;
    if (err.message === undefined) {
        message = err.error;
    } else {
        message = err.message;
    }

    return message;
}

const hostRegex = /^(https?:\/\/)?(www.)?([a-zA-Z0-9-]*)(\.[a-zA-Z0-9]{1,4})?(:[0-9]{1,5})$/;
const hostDefault = "http://localhost:8080";

exports.service = {
    properties: {
        service: {
            pattern: /^(socketio|faye)$/,
            message: 'Wrong pub sub service type specified. Use socketio or faye.',
            type: 'string',
            required: true
        }
    }
}

exports.socketio = {
    properties: {
        host: {
            pattern: hostRegex,
            message: "Please enter a valid host (e.g. http://localhost:8080)",
            default: hostDefault,
            required: true
        },
        readingsocket: {
            pattern: /^\w((\s)?\w)*$/,
            message: "Please enter a valid socket name (e.g. 'test messages')",
            type: 'string',
            required: true
        },
        writingsocket: {
            pattern: /^\w((\s)?\w)*$/,
            message: "Please enter a valid socket name (e.g. 'test messages')",
            type: 'string'
        }
    }
}

exports.faye = {
    properties: {
        suborpub: {
            pattern: /^(pub|sub)$/,
            message: 'Use pub or sub.',
            type: 'string',
            required: true
        }
    }
}

exports.fayesub = {
    properties: {
        host: {
            pattern: hostRegex,
            message: "Please enter a valid host (e.g. http://localhost:8080)",
            default: hostDefault,
            required: true
        },
        topic: {
            pattern: /^\/[a-zA-Z0-9]*$/,
            message: "Please enter a valid topic (e.g. '/news')",
            required: true
        }
    }
}

exports.fayepub = {
    properties: {
        host: {
            pattern: hostRegex,
            message: "Please enter a valid host (e.g. http://localhost:8080)",
            default: hostDefault,
            required: true
        },
        topic: {
            pattern: /^\/[a-z]+$/,
            message: "Please enter a valid topic (e.g. '/news')",
            required: true
        },
        message: {
            pattern: /^[\w\s]+$/,
            message: "Please only use Aa-Zz and 0-9.",
            type: 'string',
            required: true
        }
    }
}

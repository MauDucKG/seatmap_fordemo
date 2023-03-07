class ErrorHandler {

    throwError500(respond) {
        respond.status(500).json({
            success: false,
            message: 'Server error. Please try again',
        })
    }

    throwError404(respond) {
        respond.status(404).json({
            success: false,
            message: 'Not found. Please try again',
        })
    }
}

module.exports = new ErrorHandler()

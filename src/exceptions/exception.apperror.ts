class AppError extends Error {
  public statusCode: number
  public message: string

  constructor (statusCode: number = 400, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
  }
}

export default AppError

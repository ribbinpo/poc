class Success {
  int? code;
  Object? response;
  Success({this.code, this.response});
}

class Failure {
  int? code;
  Object? errorResponse;
  Failure(Exception exception, {this.code, this.errorResponse});
}

sealed class Result<S, E extends Exception> {
  const Result();
}

final class SuccessN<S, E extends Exception> extends Result<S, E> {
  final S value;

  const SuccessN(this.value);
}

final class FailureN<S, E extends Exception> extends Result<S, E> {
  const FailureN(this.exception);
  final E exception;
}

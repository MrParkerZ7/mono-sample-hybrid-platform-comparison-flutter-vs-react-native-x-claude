class ApiConstants {
  // Base URL - Change based on environment
  // Android Emulator: http://10.0.2.2:8080/api/v1
  // iOS Simulator: http://localhost:8080/api/v1
  // Physical Device: http://<your-ip>:8080/api/v1
  static const String baseUrl = 'http://10.0.2.2:8080/api/v1';

  // Timeouts
  static const int connectTimeout = 30000;
  static const int receiveTimeout = 30000;

  // Endpoints - Auth
  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String refreshToken = '/auth/refresh';
  static const String logout = '/auth/logout';

  // Endpoints - Users
  static const String currentUser = '/users/me';
  static const String users = '/users';

  // Endpoints - Tasks
  static const String tasks = '/tasks';

  // Endpoints - Products
  static const String products = '/products';
  static const String categories = '/products/categories';

  // Endpoints - Cart
  static const String cart = '/cart';
  static const String cartItems = '/cart/items';

  // Endpoints - Orders
  static const String orders = '/orders';

  // Endpoints - Posts
  static const String posts = '/posts';
  static const String feed = '/posts/feed';
  static const String explore = '/posts/explore';

  // Endpoints - Notes
  static const String notes = '/notes';

  // Endpoints - Events
  static const String events = '/events';
  static const String eventsMap = '/events/map';
}

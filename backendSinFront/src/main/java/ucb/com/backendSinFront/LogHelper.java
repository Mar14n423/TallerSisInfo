package ucb.com.backendSinFront;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class LogHelper {
  private LogHelper() {
    // Constructor privado para evitar instancias
  }

  public static void info(Class<?> clazz, String message) {
    getLogger(clazz).info(message);
  }

  public static void error(Class<?> clazz, String message) {
    getLogger(clazz).error(message);
  }

  public static void debug(Class<?> clazz, String message) {
    getLogger(clazz).debug(message);
  }

  private static Logger getLogger(Class<?> clazz) {
    return LoggerFactory.getLogger(clazz);
  }
}

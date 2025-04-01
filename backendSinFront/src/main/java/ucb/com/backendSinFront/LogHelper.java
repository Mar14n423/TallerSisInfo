import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogHelper {

  private LogHelper() {
    // Constructor privado para evitar instancias
  }

  public static void info(Class<?> clazz, String message) {
    LoggerFactory.getLogger(clazz).info(message);
  }

  public static void error(Class<?> clazz, String message) {
    LoggerFactory.getLogger(clazz).error(message);
  }

  public static void debug(Class<?> clazz, String message) {
    LoggerFactory.getLogger(clazz).debug(message);
  }
}

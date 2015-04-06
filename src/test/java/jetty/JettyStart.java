package jetty;

import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.nio.SelectChannelConnector;
import org.eclipse.jetty.webapp.WebAppClassLoader;
import org.eclipse.jetty.webapp.WebAppContext;

/**
 * Jetty启动类
 *
 * @author XiongHui
 *
 */
public class JettyStart {
  private final static int PORT = 8080;

  public static void main(String[] args) throws Exception {
    printOS();
    start();
  }

  /**
   * 打印系统版本
   */
  private static void printOS() {
    String os = System.getProperty("os.name");
    System.out.println("OS is: " + os);
  }

  /**
   * 启动jetty
   */
  private static void start() throws Exception {
    long bg = System.currentTimeMillis();
    Server server = new Server();
    Connector connector = new SelectChannelConnector();
    connector.setPort(PORT);
    server.setConnectors(new Connector[] {connector});

    WebAppContext webAppContext = new WebAppContext("src/main/webapp", "/");
    webAppContext.setDescriptor("src/main/webapp/WEB-INF/web.xml");
    webAppContext.setDisplayName("multilanguage");
    WebAppClassLoader classLoader = new WebAppClassLoader(webAppContext);
    webAppContext.setClassLoader(classLoader);
    webAppContext.setParentLoaderPriority(true);
    server.setHandler(webAppContext);
    System.out.println("ContextPath: " + webAppContext.getContextPath() + ";  Descriptor: "
        + webAppContext.getDescriptor());

    server.start();

    long time = System.currentTimeMillis() - bg;
    System.out.println("Jetty started in " + time + "ms");
  }
}

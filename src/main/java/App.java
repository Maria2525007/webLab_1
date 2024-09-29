import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.logging.Logger;
import com.fastcgi.FCGIInterface;

public class App {
    private static final String RESPONSE_TEMPLATE = "Content-Type: application/json\n" +
                                                    "Content-Length: %d\n\n%s";

    private static final Logger log = Logger.getLogger(App.class.getName());

    public static void main(String[] args) { 
        log.info("Сервер запущен.");
        while (new FCGIInterface().FCGIaccept() >= 0) {
            log.info("Запрос получен.");
            long startTime = System.currentTimeMillis(); // Время начала запроса

            try {
                String contentLengthStr = FCGIInterface.request.params.getProperty("CONTENT_LENGTH");
                int contentLength = (contentLengthStr != null) ? Integer.parseInt(contentLengthStr) : 0;

                if (contentLength > 0) {
                    byte[] buffer = new byte[contentLength];
                    InputStream in = System.in;
                    int bytesRead = in.read(buffer, 0, contentLength);

                    if (bytesRead == -1) {
                        log.warning("POST-запрос не содержит данных.");
                        sendJson(startTime, "{\"error\": \"Данные не получены\"}");
                        continue;
                    }

                    String requestBody = new String(buffer, StandardCharsets.UTF_8);
                    log.info("Тело запроса: " + requestBody);

                    // Парсинг тела запроса (предполагается, что это JSON)
                    HashMap<String, String> params = parseJsonBody(requestBody);

                    // Извлечение x, y и r из параметров
                    float x = Float.parseFloat(params.get("x"));
                    float y = Float.parseFloat(params.get("y"));
                    float r = Float.parseFloat(params.get("r"));

                    // Валидация данных
                    if (validateX(x) && validateY(y) && validateR(r)) {
                        boolean hit = GeometryChecker.hit(x, y, r);
                        String responseJson = String.format("{\"hit\": %b}", hit);
                        sendJson(startTime, responseJson);
                    } else {
                        sendJson(startTime, "{\"error\": \"Некорректные данные\"}");
                    }
                } else {
                    sendJson(startTime, "{\"error\": \"Данные не получены\"}");
                }
            } catch (Exception e) {
                log.severe("Ошибка: " + e.toString());
                sendJson(startTime, String.format("{\"error\": \"%s\"}", e.toString()));
            }
        }
    }

    // Метод для парсинга JSON
    private static HashMap<String, String> parseJsonBody(String body) {
        HashMap<String, String> params = new HashMap<>();
        body = body.replace("{", "").replace("}", "").replace("\"", "");
        String[] pairs = body.split(",");
        for (String pair : pairs) {
            String[] keyValue = pair.split(":");
            if (keyValue.length == 2) {
                params.put(keyValue[0].trim(), keyValue[1].trim());
            }
        }
        return params;
    }

    // Метод отправки ответа в формате JSON
    private static void sendJson(long startTime, String jsonDump) {
        long currentTime = System.currentTimeMillis();
        long elapsedTime = currentTime - startTime;
        String currentTimeStr = new SimpleDateFormat("HH:mm:ss.SSS").format(new Date(currentTime));

        String responseJson = String.format("{\"response\": %s, \"currentTime\": \"%s\", \"elapsedTime\": %d}",
                                             jsonDump, currentTimeStr, elapsedTime);

        System.out.println(String.format(RESPONSE_TEMPLATE, responseJson.getBytes(StandardCharsets.UTF_8).length, responseJson));
    }

    // Методы валидации данных
    private static boolean validateX(float x) {
        return x >= -5 && x <= 3;
    }

    private static boolean validateY(float y) {
        return y >= -5 && y <= 3;
    }

    private static boolean validateR(float r) {
        return r >= 1 && r <= 3 && r % 0.5 == 0;
    }
}

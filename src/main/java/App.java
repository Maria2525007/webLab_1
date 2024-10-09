import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.logging.Logger;

import com.fastcgi.FCGIInterface;

public class App {
    private static final Logger log = Logger.getLogger(App.class.getName());
    private static final String RESPONSE_TEMPLATE = "Content-Type: application/json\nContent-Length: %d\n\n%s";

    public static void main(String[] args) {
        FCGIInterface fcgi = new FCGIInterface();
        log.info("Сервер запущен.");

        while (fcgi.FCGIaccept() >= 0) {
            log.info("Запрос получен.");
            long startTime = System.currentTimeMillis();
                try {
                    String body = readRequestBody();
                    log.info(body);
                    
                    // Проверка на null перед обращением к полю request
                    if (FCGIInterface.request == null || FCGIInterface.request.inStream == null) {
                        log.severe("Ошибка: request или inStream не инициализирован.");
                        sendJson(startTime, "{\"error\": \"FCGI request или inStream не инициализирован.\"}");
                        continue;
                    }

                HashMap<String, String> params = parseJsonBody(body);

                if (!params.containsKey("x") || !params.containsKey("y") || !params.containsKey("r")) {
                    sendJson(startTime, "{\"error\": \"Недостаточно параметров\"}");
                    continue;
                }

                float x = Float.parseFloat(params.get("x"));
                float y = Float.parseFloat(params.get("y"));
                float r = Float.parseFloat(params.get("r"));

                // Валидация данных
                if (validateX(x) && validateY(y) && validateR(r)) {
                    boolean hit = GeometryChecker.hit(x, y, r);
                    sendJson(startTime, String.format("{\"hit\": %b}", hit));
                } else {
                    sendJson(startTime, "{\"error\": \"Некорректные данные\"}");
                }
            } catch (IOException | NumberFormatException e) {
                log.severe(e.toString());
                sendJson(startTime, String.format("{\"error\": \"%s\"}", e.toString()));
            }
        }
    }

    private static String readRequestBody() throws IOException {
        FCGIInterface.request.inStream.fill(); // Заполнение входного потока
        int contentLength = FCGIInterface.request.inStream.available(); // Доступная длина
        var buffer = ByteBuffer.allocate(contentLength); // Создание буфера
        var readBytes = FCGIInterface.request.inStream.read(buffer.array(), 0, contentLength); // Чтение данных
        return new String(buffer.array(), 0, readBytes, StandardCharsets.UTF_8); // Возврат строки
    }

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

    private static void sendJson(long startTime, String jsonDump) {
        long currentTime = System.currentTimeMillis();
        long elapsedTime = currentTime - startTime;
        String responseJson = String.format("{\"response\": %s, \"elapsedTime\": %d}",
                                             jsonDump, elapsedTime);
        System.out.printf(RESPONSE_TEMPLATE + "%n", responseJson.getBytes(StandardCharsets.UTF_8).length, responseJson);
    }

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

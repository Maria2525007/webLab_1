public class GeometryChecker {
    // Основной метод, проверяющий попадание точки
    public static boolean hit(float x, float y, float r) {
        return inRect(x, y, r) || inTriangle(x, y, r) || inCircle(x, y, r);
    }

    // Проверка попадания в прямоугольник
    private static boolean inRect(float x, float y, float r) {
        return x <= 0 && x >= -r && y >= 0 && y <= r;
    }

    // Проверка попадания в треугольник
    private static boolean inTriangle(float x, float y, float r) {
        return x >= 0 && y >= 0 && x <= r && y <= r && (y + x) <= r;
    }

    // Проверка попадания в круг
    private static boolean inCircle(float x, float y, float r) {
        return x <= 0 && y <= 0 && x >= -r && y >= -r && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2));
    }
}
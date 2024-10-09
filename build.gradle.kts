plugins {
    id("java")
    id("application")
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

group = "webserver"
version = "1.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.json:json:20231013")
    implementation(files("lib/fastcgi-lib.jar"))
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

application {
    mainClass.set("App")
}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
}


tasks.shadowJar {
    archiveBaseName.set("server")
    archiveClassifier.set("")
    archiveVersion.set(version.toString())

    manifest {
        attributes(
            "Main-Class" to "App"
        )
    }
}

tasks {
    build {
        dependsOn(shadowJar)
    }
}
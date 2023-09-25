package com.shikkeram.server.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Path;

@Component
public class PathConverter {
    @Value("${file.storage.directory}")
    private String storageDirectory;
    @Value("${backendURL}")
    private String backendURL;

    public String pathToLink(String path) {
        return backendURL +
                "/images/" +
                Path.of(path).getFileName();
    }

    public String linkToPath(String link) {
        if (!link.startsWith(backendURL))
            return link;

        String[] pathSegments = link.split("/");
        String fileNameWithExtension = pathSegments[pathSegments.length - 1];

        return storageDirectory + File.separator + fileNameWithExtension;
    }
}

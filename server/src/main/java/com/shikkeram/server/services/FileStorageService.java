package com.shikkeram.server.services;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import static java.nio.file.Paths.get;

@Service
public class FileStorageService {
    @Value("${file.storage.directory}")
    private String storageDirectory;

    @PostConstruct
    public void initialize() {
        File theDir = new File(storageDirectory);
        if (!theDir.exists()){
            theDir.mkdirs();
        }
    }

    public String[] save(List<MultipartFile> multipartFiles) throws IOException {
        String[] imageLinks = new String[multipartFiles.size()];
        for (int i = 0; i < multipartFiles.size(); i++) {
            imageLinks[i] = save(multipartFiles.get(i));
        }

        return imageLinks;
    }

    public String save(MultipartFile multipartFile) throws IOException {
        String filename = UUID.randomUUID() + getFileExtension(multipartFile.getOriginalFilename());
        Path fileStorage = get(storageDirectory, filename).toAbsolutePath().normalize();
        Files.copy(multipartFile.getInputStream(), fileStorage, StandardCopyOption.REPLACE_EXISTING);

        return fileStorage.toString();
    }

    public void deleteFiles(List<String> paths) {
        paths.forEach(this::deleteFile);
    }

    public void deleteFile(String path) {
        try {
            Files.deleteIfExists(Path.of(path));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        return dotIndex > 0 ? fileName.substring(dotIndex) : "";
    }
}

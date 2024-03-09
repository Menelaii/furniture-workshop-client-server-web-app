package com.shikkeram.server.services;

import com.shikkeram.server.exceptions.IllegalContentTypeException;
import jakarta.annotation.PostConstruct;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.UUID;

import static java.nio.file.Paths.get;

@Service
public class FileStorageService {

    private static final String JPG_FORMAT = "jpg";

    @Value("${file.storage.directory}")
    private String storageDirectory;
    @Value("${file.compression-quality}")
    private float compressionQuality;

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
        String filename = UUID.randomUUID() + ".jpg";
        Path fileStorage = get(storageDirectory, filename).toAbsolutePath().normalize();

        byte[] compressed = compressImage(multipartFile, compressionQuality, JPG_FORMAT);
        Files.write(fileStorage, compressed, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

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

    public static byte[] compressImage(MultipartFile sourceImage,
        float compressionQuality, String outputFormat
    ) throws IOException {
        if (!sourceImage.getContentType().startsWith("image")) {
            throw new IllegalContentTypeException("Пожалуйста, загрузите изображение.");
        }

        InputStream sourseImageInputStream = sourceImage.getInputStream();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Thumbnails.of(sourseImageInputStream)
            .scale(1f)
            .outputQuality(compressionQuality)
            .outputFormat(outputFormat)
            .toOutputStream(outputStream);

        byte[] bytes = outputStream.toByteArray();

        outputStream.close();
        sourseImageInputStream.close();

        return bytes;
    }
}

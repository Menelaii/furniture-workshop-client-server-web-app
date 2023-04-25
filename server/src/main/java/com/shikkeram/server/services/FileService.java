package com.shikkeram.server.services;

import com.shikkeram.server.utils.Paths;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import static java.nio.file.Paths.get;

@Service
public class FileService {
    public String[] save(List<MultipartFile> multipartFiles) throws IOException {
        String[] imageLinks = new String[multipartFiles.size()];
        for (int i = 0; i < multipartFiles.size(); i++) {
            String filename = UUID.randomUUID().toString() + multipartFiles.get(i).getOriginalFilename();
            Path fileStorage = get(Paths.UPLOAD_DIRECTORY, filename).toAbsolutePath().normalize();
            Files.copy(multipartFiles.get(i).getInputStream(), fileStorage, StandardCopyOption.REPLACE_EXISTING);
            imageLinks[i] = fileStorage.toString();
        }

        return imageLinks;
    }

    public void deleteFiles(List<String> paths) {
        paths.forEach( p -> {
            try {
                Files.deleteIfExists(Path.of(p));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }
}

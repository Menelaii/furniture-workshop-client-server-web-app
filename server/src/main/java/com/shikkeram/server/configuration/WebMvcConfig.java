package com.shikkeram.server.configuration;

import com.shikkeram.server.utils.Paths;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@EnableWebMvc
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        File theDir = new File(Paths.UPLOAD_DIRECTORY);
        if (!theDir.exists()){
            theDir.mkdirs();
        }

        registry
                .addResourceHandler("/images/**")
                .addResourceLocations("file:///" + Paths.UPLOAD_DIRECTORY);

//        registry
//                .addResourceHandler("/client/**")
//                .addResourceLocations("classpath:/static/");
//
//        registry.addResourceHandler("/*.html", "/*.css", "/*.js")
//                .addResourceLocations("classpath:/static/");
    }
}

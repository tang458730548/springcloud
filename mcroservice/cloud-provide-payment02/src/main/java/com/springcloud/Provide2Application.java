package com.springcloud;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * provide
 */
@SpringBootApplication
public class Provide2Application {
    private static final Logger LOGGER = LoggerFactory.getLogger(Provide2Application.class);
    public static void main(String[] args) {
        SpringApplication.run(Provide2Application.class,args);
        LOGGER.info("启动application【{}】" , "成功");
    }
}

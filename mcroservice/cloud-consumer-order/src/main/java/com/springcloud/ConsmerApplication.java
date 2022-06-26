package com.springcloud;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 消费者
 */
@SpringBootApplication
public class ConsmerApplication {
    private static final Logger LOGGER = LoggerFactory.getLogger(ConsmerApplication.class);
    public static void main(String[] args) {
        SpringApplication.run(ConsmerApplication.class,args);
        LOGGER.info("启动application【{}】" , "成功");
    }
}

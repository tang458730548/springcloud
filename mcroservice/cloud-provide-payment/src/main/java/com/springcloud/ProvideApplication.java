package com.springcloud;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.ribbon.RibbonClient;

/**
 * provide
 */
@SpringBootApplication
public class ProvideApplication {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProvideApplication.class);
    public static void main(String[] args) {
        SpringApplication.run(ProvideApplication.class,args);
        LOGGER.info("启动application【{}】" , "成功");
    }
}

package com.springcloud;

import com.springcloud.rabbon.MyselfRule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.ribbon.RibbonClient;

/**
 * 消费者
 */
@SpringBootApplication
@EnableEurekaClient
//name为生产者服务的服务名称  configuration为配置类的类名
@RibbonClient(name = "mcroservice-payment",configuration = MyselfRule.class)
public class ConsmerApplication {
    private static final Logger LOGGER = LoggerFactory.getLogger(ConsmerApplication.class);
    public static void main(String[] args) {
        SpringApplication.run(ConsmerApplication.class,args);
        LOGGER.info("启动application【{}】" , "成功");
    }
}

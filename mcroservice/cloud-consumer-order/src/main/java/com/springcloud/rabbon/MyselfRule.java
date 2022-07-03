package com.springcloud.rabbon;

import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.RandomRule;
import com.netflix.loadbalancer.RoundRobinRule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author tsc
 * @since 2022/6/27 15:35
 */
@Configuration
public class MyselfRule {

    @Bean
    public IRule MyselfRule() {
        // 定义为随机
        return new RoundRobinRule();
    }
}

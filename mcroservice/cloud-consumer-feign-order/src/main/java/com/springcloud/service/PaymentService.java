package com.springcloud.service;

import com.springcloud.util.CommonResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.concurrent.TimeUnit;

/**
 * @author tsc
 * @since 2022/6/27 16:47
 */

@ComponentScan
@FeignClient(value ="mcroservice-payment")//使用Feign
public interface PaymentService {
    @GetMapping("/payment/get/{id}")
    CommonResult queryById(@PathVariable("id") Long id);

    /**
     * 调用生产者微服务名称为mcroservice-payment下边的模拟超时的接口
     */
    @GetMapping("/payment/feign/timeout")
    String PaymentFeignTimeOut() throws InterruptedException;
}
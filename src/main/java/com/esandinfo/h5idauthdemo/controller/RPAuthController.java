package com.esandinfo.h5idauthdemo.controller;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import com.alibaba.fastjson.JSON;
import com.esandinfo.h5idauthdemo.entity.RPRequest;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class RPAuthController {
    String APPCODE="ccc03a6cce634c3daf56a2d778e74765";
    @PostMapping("/getVerifyUrl")
    @ResponseBody
    public String getVerifyUrl(@RequestBody String req){
        RPRequest request=JSON.parseObject(req, RPRequest.class);
        Map<String,Object> map = new HashMap<>();
        map.put("bizId",request.getBizId());
        map.put("idName",request.getCertName());
        map.put("idNumber",request.getCertNo());
        map.put("type",request.getLivingType());
        map.put("returnUrl",request.getReturnUrl());
        map.put("notifyUrl",request.getNotifyUrl());
        HttpResponse httpResponse = HttpRequest.post("http://zimfaceid1.market.alicloudapi.com/comms/zfi/init")
                .form(map)
                .header("Authorization", "APPCODE "+APPCODE)
                .header("X-Ca-Nonce", RandomStringUtils.random(8,"1234567890987654321234567890"))
                .header("Content-Type", "application/x-www-form-urlencoded;chart-set:utf-8")
                .execute();
        return  httpResponse.body();
    }


}

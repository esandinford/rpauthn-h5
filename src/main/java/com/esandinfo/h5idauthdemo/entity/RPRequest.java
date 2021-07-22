package com.esandinfo.h5idauthdemo.entity;

import lombok.Data;

@Data
public class RPRequest {
    public String bizId;
    public String certName;
    public String certNo;
    public String livingType;
    public String returnUrl;
    public String notifyUrl;
}

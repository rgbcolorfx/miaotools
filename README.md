# 秒用工具箱 MiaoTools

一个前端工具网站

- 支持中英文切换（默认英文，自动记忆）
- 支持访问量统计（基于 `countapi.xyz`）

## 已实现功能

- 编码与数据: JSON 格式化/校验、Base64、URL Encode/Decode、HTML Escape、进制转换、SHA-256
- 文本处理: 文本去重排序、大小写转换、正则测试、字数统计
- 时间与随机: 时间戳转换、UUID、密码生成器、随机数生成
- 单位转换: 温度换算、长度换算、HEX/RGB 颜色转换
- 生活计算: 油耗计算、BMI、年龄计算、日期差、倒计时、百分比、单价计算
- 金融理财: 复利计算器、定投计算器、收益率计算器、贷款计算器（等额本息/等额本金）、房贷计算器（含公积金组合贷款）
- 开发工具: JWT解析、Cron生成器、SQL格式化、Markdown预览、三联调试台、正则可视化、Mock数据生成、CSV/JSON转换
- 图像工具: 二维码生成器、图片压缩与格式转换、调色板生成、EXIF查看、GIF帧提取
- 文档与媒体: 音频转WAV、PDF合并拆分
- 可视化: 文本流程图编辑器
- 新增开发工具: JWT签名生成、Query参数编辑、Unix时间格式化、文本Diff、JSON Schema校验、表单生成器
- 安全工具: JWT过期监控、AES/RSA加解密
- AI工具: 图片OCR识别
- 设计工具: CSS渐变生成器、Box-Shadow生成器
- 其他新增: 图片去背景(纯色)、SVG优化器、正则助手、敏感信息脱敏、PWA图标生成、拼音转换、脑图导出
- 本轮补充: JSON Diff、多算法哈希、HMAC、文本清洗、文本分列合并、批量替换、图片缩放裁剪、图片转PDF、音频裁剪

## 本地运行

直接双击 `index.html` 或使用任意静态服务器。

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

示例单工具页面：

- `http://localhost:8080/?tool=compound`（复利计算器）
- `http://localhost:8080/?tool=mortgage`（房贷计算器）
- `http://localhost:8080/?tool=qr`（二维码生成器）
- `http://localhost:8080/?tool=img-convert`（图片压缩转换）

## 后续扩展建议

- 增加二维码、条形码、图片压缩、图片格式转换等前端工具
- 增加多语言与暗色主题切换
- 将工具拆分到独立模块文件，便于维护

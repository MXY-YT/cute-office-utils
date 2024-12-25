# CUTE-OFFICE-UTILS

## EXCEL/PDF/WORD/PPT 转为PDF 多页面/指定页面转为图片

## 介绍

一款轻量级的 Office 工具库，包括转化 WORD、PPT、EXCEL 转为 PDF，将 Office 指定页面 转为 图片

gitee 地址 [https://gitee.com/luochen-yuntian/cute-office-utils](https://gitee.com/luochen-yuntian/cute-office-utils)

github 地址 [https://github.com/MXY-YT/cute-office-utils](https://github.com/MXY-YT/cute-office-utils)

---

## 安装教程

### 一、安装依赖

`npm` : `npm install cute-office-utils`

`yarn` : `yarn add cute-office-utils`

`pnpm` : `pnpm install cute-office-utils`

### 二、 安装依赖软件 (可按照需求下载指定软件)

#### 1、多页面/指定页面转为图片 所需软件 [GraphicsMagick 安装指南](https://gitcode.com/gh_mirrors/pdf/pdf2image/blob/master/docs/gm-installation.md)

##### `Windows`

- 下载 [Ghostscript 9.52](https://github.com/ArtifexSoftware/ghostpdl-downloads/releases/tag/gs952)
- 下载 [GraphicsMagick for Windows](http://ftp.icm.edu.pl/pub/unix/graphics/GraphicsMagick/windows/)

添加环境变量：

- `C:\Program Files\gs\gs****\bin`
- `C:\program files\graphicsmagick-****`

注意：当 Ghostscript 版本为 9.53 或更高时可能会出现错误。

#####  `Linux (基于 Debian 的系统)`

```linux
    sudo apt-get update
    sudo apt-get install ghostscript
    sudo apt-get install graphicsmagick
```

##### `MacOS`

```mac
    brew update
    brew install gs graphicsmagick
```

#### 2、Office 转为 PDF 所需软件 [下载 LibreOffice](https://zh-cn.libreoffice.org/download/libreoffice/)

##### `可参考文章` [ office 转 pdf ](https://blog.csdn.net/weixin_44434938/article/details/140871916)

---

## 使用说明

### 1、Office 文件转 PDF

```typescript
import { CuteConvert } from 'cute-office-utils/dist'; 
const cuteConvert = new CuteConvert("D:\\**\\cute-office-utils\\test.pptx") // 文件完整路径
cuteConvert.to_pdf().then(res => {
    console.log(res)
})
```

#### 执行结果

```
{
  inputFilePath: 'D:\\**\\cute-office-utils\\test.pptx', // 源文件
  outputFilePath: 'D:\\**\\cute-office-utils\\cuteConvert', // 输出文件路径
  result: {
    success: true, // 执行结果
    message: '命令执行成功', // 执行结果信息
    stdout: 'convert D:\\**\\cute-office-utils\\test.pptx as a Impress document -> D:\\**\\cute-office-utils\\cuteConvert\\test.pdf mpress_pdf_Export\n' +
      'Overwriting: D:\\**\\cute-office-utils\\cuteConvert\\test.pdf\n', // 执行命令信息
    stderr: '' // 执行命令错误信息
  }
}

```

#### 完整参数示例

```typescript
import { CuteConvert } from 'cute-office-utils/dist';
const cuteConvert = new CuteConvert("D:\\**\\cute-office-utils\\test.pptx")
cuteConvert.to_pdf({
    debug: true, // 调试模式 (打印到控制台)， 默认 true
    output: {
        fileDir: 'D:\\**\\cute-office-utils\\test', // 生成的 PDF文件 文件目录 默认 ./cuteConvert
    }
}).then(res => {
    console.log(res)
})
```

### 2、Office 文件 指定页面 转 图片

```typescript
cuteConvert.to_image().then(res => {
    console.log(res)
})
```

#### 执行结果

```
{
  inputFilePath: 'D:\\**\\cute-office-utils\\test.pptx', // 源文件
  outputFilePath: 'D:\\**\\cute-office-utils\\cuteConvert', // 输出文件目录
  result: [ 
     {     
      success: true, // 执行结果
      message: '命令执行成功',  // 执行结果信息
      stdout: '',  // 执行命令输出
      stderr: '' // 执行命令错误信息 
     } 
  ]
}
```

#### 完整参数示例

```typescript
const cuteConvert = new CuteConvert("D:\\**\\cute-office-utils\\test.pptx")
cuteConvert.to_image({
    /**
     * 页码 （ 支持 N 、'N-M' 、 [ N, M, ...] ）
     *  N: N 页 （ 第 N 页 ）
     *  'N-M': N 页到 M 页  （ 包含 N 和 M ）
     *  [ N, M, ... ]: 列表中的每一页
     */
    page: [5, 8], // 默认全部页面
    debug: true, // 调试模式 (打印到控制台)， 默认 true
    clearCache: true, // 转换完成后是否删除源文件（仅删除中间 PDF文件， 源文件如果是 PDF 文件，则不会删除），默认 true
    dpi: 300, // 分辨率，默认 300
    output: {
        fileDir: 'D:\\**\\cute-office-utils\\test', // 生成的图片 文件目录 默认 ./cuteConvert
        fileName: 'test', // 文件名 默认 原文件名-${页数}
        suffix: 'png', // 后缀名 默认 png
    }
}).then(res => {
    console.log(res)
})
```

---

### 函数

#### 1、to_pdf (Office 转 PDF)

|    参数    |         类型          | 描述  | 默认值 | 是否必须 |           返回值           | 是否异步 |
|:--------:|:-------------------:|:---:|:---:|:----:|:-----------------------:|:----:|
| `option` | `OfficeToPDFOption` | 配置项 |  -  |  否   | `Result<ExecuteResult>` |  是   |

```
    to_pdf(option?: OfficeToPDFOption): Promise<Result<ExecuteResult>>
```

#### 1、to_image (Office 指定页面 转 图片)

|    参数    |          类型           | 描述  | 默认值 | 是否必须 |            返回值            | 是否异步 |
|:--------:|:---------------------:|:---:|:---:|:----:|:-------------------------:|:----:|
| `option` | `OfficeToImageOption` | 配置项 |  -  |  否   | `Result<ExecuteResult[]>` |  是   |

```
    to_image(option?: OfficeToImageOption): Promise<Result<ExecuteResult[]>>
```

---

## 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

---

## 联系作者邮箱 （admin@cuteshamoye.cn）

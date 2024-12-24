import fs from "fs";
import {exec} from "child_process";
import iconv from "iconv-lite";

class Utils {

    /**
     * 处理页码
     * @param page 页码参数 （ 支持 N 、'N-M' 、 [ N, M, ...] ）
     * @param page -> N: 第 N 页
     * @param page -> 'N-M': N 页到 M 页  （ 包含 N 和 M ）
     * @param page -> [ N, M, ... ]: 列表中的每一页
     * @returns 返回页码数组
     */
    public static handlePage(page: CuteUtils.HandelPage['page']): CuteUtils.HandelPage['result'] {
        let firstPage = 1
        let lastPage = null
        const resultList: CuteUtils.HandelPage['result'] = []
        switch (typeof page) {
            case "object":
                if (Array.isArray(page)) {
                    page.forEach(item => {
                        resultList.push({firstPage: item, lastPage: item})
                    })
                }
                return resultList;
            case "string":
                const pages = page.split('-')
                firstPage = Number(pages[0])
                lastPage = Number(pages[1])
                break;
            case "number":
                firstPage = page
                break;
        }
        resultList.push({firstPage, lastPage})
        return resultList
    }

    /**
     * 图片转 base64
     * @param options
     * @param options.filePath 文件路径
     * @param options.isDataUrl 是否为在 base64 返回值
     * @param options.isDebug 是否为调试模式
     */
    public static async image_to_base64(options: CuteUtils.ImageToBase64) {
        const {filePath, isDataUrl, isDebug} = options
        let base64Image = ""
        fs.readFile(filePath, (err, data) => {
            if (err) {
                isDebug ? console.error(`文件读取失败: ${err.message}`) : '';
                return "";
            }
            const base64 = data.toString('base64');
            base64Image = isDataUrl ? 'data:image/png;base64,' + base64 : base64;
        });
        return base64Image;
    }

    /**
     * 执行命令并返回 Promise
     * @param command 要执行的命令
     */
    public static async executeCommand(command: string): Promise<Cute.Convert.ExecuteResult> {
        const encoding = 'cp936'; // 默认编码
        const binaryEncoding = 'binary'; // 二进制编码
        return new Promise((resolve, reject) => {
            exec(command, {encoding: binaryEncoding}, (error: (Cute.ExecException | null), stdout: string, stderr: string) => {
                resolve({
                    success: !error,
                    message: error ? `命令执行失败: ${error}` : "命令执行成功",
                    stdout: iconv.decode(Buffer.from(stdout, binaryEncoding), encoding),
                    stderr: iconv.decode(Buffer.from(stderr, binaryEncoding), encoding)
                });
            });
        });
    }
}

export default Utils

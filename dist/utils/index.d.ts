declare class Utils {
    /**
     * 处理页码
     * @param page 页码参数 （ 支持 N 、'N-M' 、 [ N, M, ...] ）
     * @param page -> N: 第 N 页
     * @param page -> 'N-M': N 页到 M 页  （ 包含 N 和 M ）
     * @param page -> [ N, M, ... ]: 列表中的每一页
     * @returns 返回页码数组
     */
    static handlePage(page: CuteUtils.HandelPage['page']): CuteUtils.HandelPage['result'];
    /**
     * 图片转 base64
     * @param options
     * @param options.filePath 文件路径
     * @param options.isDataUrl 是否为在 base64 返回值
     * @param options.isDebug 是否为调试模式
     */
    static image_to_base64(options: CuteUtils.ImageToBase64): Promise<string>;
    /**
     * 执行命令并返回 Promise
     * @param command 要执行的命令
     */
    static executeCommand(command: string): Promise<Cute.Convert.ExecuteResult>;
}
export default Utils;

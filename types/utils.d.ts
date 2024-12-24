namespace CuteUtils {
    /**
     * 页码处理
     */
    interface HandelPage extends Cute.Page{
        /**
         * 返回页码数组
         */
        result: Array<{
            /**
             * 第一页
             */
            firstPage: number;
            /**
             * 最后一页
             */
            lastPage: number | null;
        }>
    }

    /**
     * 图片转 base64
     */
    interface ImageToBase64 {
        /**
         * 图片路径
         */
        filePath: string;
        /**
         * 是否为在 base64 返回值
         */
        isDataUrl?: boolean;
        /**
         * 是否为调试模式
         */
        isDebug?: boolean;
    }


}

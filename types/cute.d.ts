namespace Cute {
    interface Page {
        /**
         * 页码 （ 支持 N 、'N-M' 、 [ N, M, ...] ）
         *  N: N 页 （ 第 N 页 ）
         *  'N-M': N 页到 M 页  （ 包含 N 和 M ）
         *  [ N, M, ... ]: 列表中的每一页
         */
        page?: number | Array<number> | string | undefined;
    }

    /**
     * 转换器
     */
    namespace Convert {
        /**
         * 基础选项
         */
        interface BaseOption {
            /**
             * 清除缓存 （清除转换时产生的中间文件）
             */
            clearCache?: boolean;
            /**
             * 调试模式
             */
            debug?: boolean;
            /**
             * 输出文件格式
             */
            output?: {
                /**
                 * 文件目录 默认 ./cuteConvert
                 */
                fileDir?: string,
            }
        }

        /**
         * Office 转 PDF 选项
         */
        interface OfficeToPDFOption extends BaseOption {
        }

        /**
         * Office 转图片 选项
         */
        interface OfficeToImageOption extends BaseOption, Page {
            /**
             * 分辨率 默认 300
             */
            dpi?: number;
            /**
             * 输出文件格式
             */
            output?: {
                /**
                 * 文件名 默认 原文件名-${页数}
                 */
                fileName?: string,
                /**
                 * 生成的图片 文件目录 默认 ./cuteConvert
                 */
                fileDir?: string,
                /**
                 * 文件后缀 默认 png
                 */
                suffix?: string
            }
        }


        /**
         * 执行结果
         */
        interface ExecuteResult {
            /**
             * 执行是否成功
             */
            success?: boolean,
            /**
             * 执行结果信息
             */
            message?: string,
            /**
             * 执行输出
             */
            stdout?: string,
            /**
             * 执行错误输出
             */
            stderr?: string
        }

        /**
         * 转换结果
         */
        interface Result<T> {
            /**
             * 输入文件路径
             */
            inputFilePath: string,
            /**
             * 输出文件路径
             */
            outputFilePath: string,
            /**
             * 执行结果
             */
            result: T
        }
    }

    /**
     * 执行异常 (来自 child_process 包)
     */
    interface ExecException extends Error {
        cmd?: string | undefined;
        killed?: boolean | undefined;
        code?: number | undefined;
        signal?: NodeJS.Signals | undefined;
        stdout?: string;
        stderr?: string;
    }
}

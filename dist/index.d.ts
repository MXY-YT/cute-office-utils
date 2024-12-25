import ExecuteResult = Cute.Convert.ExecuteResult;
import Result = Cute.Convert.Result;
import OfficeToImageOption = Cute.Convert.OfficeToImageOption;
import OfficeToPDFOption = Cute.Convert.OfficeToPDFOption;
export declare class CuteConvert {
    /**
     * Office 文件路径（绝对路径）
     */
    private readonly filePath;
    /**
     * @param filePath Office 文件路径（绝对路径，完整路径）
     */
    constructor(filePath: string);
    /**
     * Office 转 PDF
     */
    to_pdf(option?: OfficeToPDFOption): Promise<Result<ExecuteResult>>;
    /**
     * Office 转图片
     * @param option 配置项
     */
    to_image(option?: OfficeToImageOption): Promise<Result<ExecuteResult[]>>;
}

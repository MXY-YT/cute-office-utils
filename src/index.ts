import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import Utils from "./utils";
import ExecuteResult = Cute.Convert.ExecuteResult;
import Result = Cute.Convert.Result;
import OfficeToImageOption = Cute.Convert.OfficeToImageOption;
import OfficeToPDFOption = Cute.Convert.OfficeToPDFOption;


export class CuteConvert {
    /**
     * Office 文件路径（绝对路径）
     */
    private readonly filePath: string;

    /**
     * @param filePath Office 文件路径（绝对路径，完整路径）
     */
    constructor(filePath: string) {
        if (!fs.existsSync(filePath)) {
            throw new Error("文件不存在");
        }
        this.filePath = filePath;
    }

    /**
     * Office 转 PDF
     */
    public async to_pdf(option?: OfficeToPDFOption): Promise<Result<ExecuteResult>> {
        const {fileDir, debug} = {
            fileDir: path.dirname(this.filePath) + '\\cuteConvert',
            debug: true,
            ...(option || {})
        };
        const cmd = `soffice --headless --convert-to pdf ${this.filePath} ${fileDir ? '--outdir ' + fileDir : ''}`;
        const result = await Utils.executeCommand(cmd);
        !result.success && debug && console.error(`exec error: ${result.message}`);
        return {
            inputFilePath: this.filePath,
            outputFilePath: fileDir,
            result
        };
    }

    /**
     * Office 转图片
     * @param option 配置项
     */
    public async to_image(option?: OfficeToImageOption): Promise<Result<ExecuteResult[]>> {
        let filePath = this.filePath
        let bool = !filePath.endsWith('.pdf')
        if (bool) {
            const toPdfResult = await this.to_pdf({debug: false})
            if (!toPdfResult.result.success) {
                return {
                    ...toPdfResult,
                    result: [toPdfResult.result]
                }
            }
            filePath = toPdfResult.outputFilePath + '\\' + path.basename(this.filePath, path.extname(this.filePath)) + '.pdf'
        }
        const page = Utils.handlePage(option?.page);
        const {fileDir, fileName, suffix, debug, clearCache} = {
            fileDir: path.dirname(filePath),
            fileName: path.basename(filePath, path.extname(filePath)) + '-%d',
            suffix: 'png',
            debug: true,
            clearCache: true,
            ...(option || {})
        };
        const resultList = []
        for (const p of page) {
            const cmd = `gs -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -sDEVICE=png16m -dGraphicsAlphaBits=4 -r${option?.dpi ?? 300} -dFirstPage=${p.firstPage} ${p.lastPage ? '-dLastPage=' + p.lastPage : ""} -sOutputFile=${fileDir}\\${fileName}.${suffix} ${filePath}`;
            const command = os.platform() === 'win32' ? `cmd /c ${cmd}` : cmd;
            const result = await Utils.executeCommand(command);
            !result.success && debug && console.error(`exec error: ${result.message}`);
            resultList.push(result)
        }
        if (bool && clearCache) {
            fs.unlinkSync(filePath)
        }
        return {
            inputFilePath: this.filePath,
            outputFilePath: `${fileDir}`,
            result: resultList
        };
    }
}

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuteConvert = void 0;
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const utils_1 = __importDefault(require("./utils"));
class CuteConvert {
    /**
     * @param filePath Office 文件路径（绝对路径，完整路径）
     */
    constructor(filePath) {
        if (!fs.existsSync(filePath)) {
            throw new Error("文件不存在");
        }
        this.filePath = filePath;
    }
    /**
     * Office 转 PDF
     */
    to_pdf(option) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fileDir, debug } = Object.assign({ fileDir: path.dirname(this.filePath) + '\\cuteConvert', debug: true }, (option || {}));
            const cmd = `soffice --headless --convert-to pdf ${this.filePath} ${fileDir ? '--outdir ' + fileDir : ''}`;
            const result = yield utils_1.default.executeCommand(cmd);
            !result.success && debug && console.error(`exec error: ${result.message}`);
            return {
                inputFilePath: this.filePath,
                outputFilePath: fileDir,
                result
            };
        });
    }
    /**
     * Office 转图片
     * @param option 配置项
     */
    to_image(option) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let filePath = this.filePath;
            let bool = !filePath.endsWith('.pdf');
            if (bool) {
                const toPdfResult = yield this.to_pdf({ debug: false });
                if (!toPdfResult.result.success) {
                    return Object.assign(Object.assign({}, toPdfResult), { result: [toPdfResult.result] });
                }
                filePath = toPdfResult.outputFilePath + '\\' + path.basename(this.filePath, path.extname(this.filePath)) + '.pdf';
            }
            const page = utils_1.default.handlePage(option === null || option === void 0 ? void 0 : option.page);
            const { fileDir, fileName, suffix, debug, clearCache } = Object.assign({ fileDir: path.dirname(filePath), fileName: path.basename(filePath, path.extname(filePath)) + '-%d', suffix: 'png', debug: true, clearCache: true }, (option || {}));
            const resultList = [];
            for (const p of page) {
                const cmd = `gs -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -sDEVICE=png16m -dGraphicsAlphaBits=4 -r${(_a = option === null || option === void 0 ? void 0 : option.dpi) !== null && _a !== void 0 ? _a : 300} -dFirstPage=${p.firstPage} ${p.lastPage ? '-dLastPage=' + p.lastPage : ""} -sOutputFile=${fileDir}\\${fileName}.${suffix} ${filePath}`;
                const command = os.platform() === 'win32' ? `cmd /c ${cmd}` : cmd;
                const result = yield utils_1.default.executeCommand(command);
                !result.success && debug && console.error(`exec error: ${result.message}`);
                resultList.push(result);
            }
            if (bool && clearCache) {
                fs.unlinkSync(filePath);
            }
            return {
                inputFilePath: this.filePath,
                outputFilePath: `${fileDir}`,
                result: resultList
            };
        });
    }
}
exports.CuteConvert = CuteConvert;

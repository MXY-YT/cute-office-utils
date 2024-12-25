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
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const iconv = __importStar(require("iconv-lite"));
class Utils {
    /**
     * 处理页码
     * @param page 页码参数 （ 支持 N 、'N-M' 、 [ N, M, ...] ）
     * @param page -> N: 第 N 页
     * @param page -> 'N-M': N 页到 M 页  （ 包含 N 和 M ）
     * @param page -> [ N, M, ... ]: 列表中的每一页
     * @returns 返回页码数组
     */
    static handlePage(page) {
        let firstPage = 1;
        let lastPage = null;
        const resultList = [];
        switch (typeof page) {
            case "object":
                if (Array.isArray(page)) {
                    page.forEach(item => {
                        resultList.push({ firstPage: item, lastPage: item });
                    });
                }
                return resultList;
            case "string":
                const pages = page.split('-');
                firstPage = Number(pages[0]);
                lastPage = Number(pages[1]);
                break;
            case "number":
                firstPage = page;
                break;
        }
        resultList.push({ firstPage, lastPage });
        return resultList;
    }
    /**
     * 图片转 base64
     * @param options
     * @param options.filePath 文件路径
     * @param options.isDataUrl 是否为在 base64 返回值
     * @param options.isDebug 是否为调试模式
     */
    static image_to_base64(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filePath, isDataUrl, isDebug } = options;
            let base64Image = "";
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    isDebug ? console.error(`文件读取失败: ${err.message}`) : '';
                    return "";
                }
                const base64 = data.toString('base64');
                base64Image = isDataUrl ? 'data:image/png;base64,' + base64 : base64;
            });
            return base64Image;
        });
    }
    /**
     * 执行命令并返回 Promise
     * @param command 要执行的命令
     */
    static executeCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const encoding = 'cp936'; // 默认编码
            const binaryEncoding = 'binary'; // 二进制编码
            return new Promise((resolve, reject) => {
                (0, child_process_1.exec)(command, { encoding: binaryEncoding }, (error, stdout, stderr) => {
                    resolve({
                        success: !error,
                        message: error ? `命令执行失败: ${error}` : "命令执行成功",
                        stdout: iconv.decode(Buffer.from(stdout, binaryEncoding), encoding),
                        stderr: iconv.decode(Buffer.from(stderr, binaryEncoding), encoding)
                    });
                });
            });
        });
    }
}
exports.default = Utils;

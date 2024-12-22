import TypeFile from "@/type/data/file";
import Path from "path";
import FS from "fs";

export default class File {
    /**
     * 儲存檔案
     *
     * @param {string} path 路徑
     * @param {TypeFile} fileInfo 檔案資訊
     * @param {boolean} isPublic 檔案是否公開
     *
     * @returns {null | string} 檔案路徑
     */
    public save(
        path: string,
        fileInfo: TypeFile,
        isPublic: boolean = true
    ): null | string {
        const folder: string = isPublic ? "public" : "private";
        const fullPath: string = Path.join(global.storagePath, folder, path);
        const filePath: string = Path.join(fullPath, fileInfo.hashName);

        // 設定路徑
        if (this.setPath(fullPath) === false) {
            return null;
        }

        // 移動檔案
        if (this.move(fileInfo.path, filePath) === false) {
            return null;
        }

        return filePath;
    }

    /**
     * 設定路徑(如果路徑不存在)
     *
     * @param {string} path 路徑
     *
     * @returns {boolean} 是否成功
     */
    private setPath(path: string): boolean {
        // 檢查路徑是否存在
        if (FS.existsSync(path) === true) {
            return true;
        }

        // 新增路徑
        try {
            FS.mkdirSync(path, { recursive: true });
            return true;
        } catch (error) {
            console.log("建立檔案資料夾失敗");
        }

        return false;
    }

    /**
     * 移動檔案
     *
     * @param {string} oldFilePath 舊檔案路徑
     * @param {string} filePath 檔案路徑
     *
     * @returns {boolean} 是否成功
     */
    private move(oldFilePath: string, filePath: string): boolean {
        try {
            FS.renameSync(oldFilePath, filePath);
        } catch (error: any) {
            console.log(`移動檔案至${filePath}失敗`);
            return false;
        }

        return true;
    }
}

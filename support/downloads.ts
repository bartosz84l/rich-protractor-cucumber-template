import * as fs from "fs";
import * as path from "path";

export class Downloads {
    static downloadedImagePath = `${process.cwd()}/data/downloads/image.jpg`;

    public static deleteIfExists(file) {
        if (fs.existsSync(file) && path.basename(file) != '.gitkeep') {
            fs.unlinkSync(file);
        };
    };

    public static removeDownloadedFiles() {
        fs.readdirSync(`${process.cwd()}/data/downloads/`).forEach(file =>
            this.deleteIfExists(`${process.cwd()}/data/downloads/` + file));
    };

    public static isImageDownloaded() {
        return fs.existsSync(this.downloadedImagePath);
    };
}
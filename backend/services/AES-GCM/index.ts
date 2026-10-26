// Copyright (c) 2026 Raj
// See LICENSE for details. 

import * as crypto from "node:crypto";

declare global {
    namespace crypto {
        interface Cipheriv {
            getAuthTag: () => Buffer;
        }
    }
}

class AES_GCM {
    private algorithm: string = "aes-256-gcm";
    private ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

    private getEncryptionKey = () => {
        if (!this.ENCRYPTION_KEY || !/^[0-9a-fA-F]{64}$/.test(this.ENCRYPTION_KEY)) {
            throw new Error("ENCRYPTION_KEY must be 32 bytes encoded as 64 hex characters");
        }
        return Buffer.from(this.ENCRYPTION_KEY, "hex");
    }


    public encrypt = (plainText: string) => {
        const key = this.getEncryptionKey();
        const iv = crypto.randomBytes(12);

        const cipher = crypto.createCipheriv(this.algorithm, key, iv);

        let encryptedData = cipher.update(plainText, "utf-8", "base64");
        encryptedData += cipher.final("base64");

        // @ts-ignore
        const authTag = cipher.getAuthTag();

        return { iv: iv.toString("base64"), authTag: authTag.toString("base64"), encryptedData };
    }

    public decrypt = (iv: string, authTag: string, encryptedText: string) => {
        const key = this.getEncryptionKey();
        const decipher = crypto.createDecipheriv(this.algorithm, key, Buffer.from(iv, "base64"));

        // @ts-ignore
        decipher.setAuthTag(Buffer.from(authTag, "base64"));

        let decryptedData = decipher.update(encryptedText, "base64", "utf-8");
        decryptedData += decipher.final("utf-8");

        return decryptedData;
    }
}

export default new AES_GCM();
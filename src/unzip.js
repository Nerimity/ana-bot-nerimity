import uzip from "uzip";

export function unzip(base64) {
  try {
    return uzip.inflate(base64ToArrayBuffer(base64));
  } catch {
    return null;
  }
}

export function unzipJson(base64) {
  try {
    return JSON.parse(decodeU8intoUTF8(unzip(base64)) || "");
  } catch {
    return null;
  }
}

function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function decodeU8intoUTF8(bytes) {
  return new TextDecoder("utf-8").decode(bytes);
}

import recursiveReadDir from "recursive-readdir";
import path from "path";
import fs from "fs";

export const GetFilesFrom = (filePath: string): Promise<string[]> => {

  return recursiveReadDir(filePath)
    .then((result) =>
      result.filter((file) => path.extname(file).toLowerCase() === ".mp3")
    )
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const ExtractToFile = (jsonObj: unknown, filename: string): void => {
  const jsonContent = JSON.stringify(jsonObj, null, 2);
  const today = new Date();

  const fname = `./${today.getSeconds()}${today.getMinutes()}${filename}.json`;

  // eslint-disable-next-line consistent-return
  fs.writeFile(fname, jsonContent, "utf8", (err) => {
    if (err) {
      console.error("An error occured while writing JSON Object to File.");
      return console.error(err);
    }
  });
};

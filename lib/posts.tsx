import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "/api/items");


/*
- db取得
- id取得
*/

// dynamic-routes
// ファイル名から'.md'を抜いたファイル名のリストを返す

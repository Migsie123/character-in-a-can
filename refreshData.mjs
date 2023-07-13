import fs from "fs";
const fsPromise = fs.promises;
import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from "./google-api.json" assert {type: "json"};

const dataFile = "data.json.new";
const sheetId = "1ik5QkaZVkTnfuqjvzh8m4jLQBnHJDHO0bjLWoKIqUQE";

function parseJSON(str) {
  try {
      return JSON.parse(str);
  } catch (e) {
      return false;
  }
}

const formatCanData = async (doc) => {
  const firstGroupNameCol = 2;
  const nextGroupCell = 3;
  const firstRow = 3;
  const delayBetweenSheets = 5;

  const templates = [];
  const sheets = doc.sheetsByIndex;

  //Loop all sheets
  for (let index = 0; index < sheets.length; index++) {
    for(let sec = 0; sec < delayBetweenSheets; sec++){
      await new Promise((r) => setTimeout(r, 1000));
    }
    console.log(`Sheet ${index} / ${sheets.length}`);
    if (typeof sheets[index] == "undefined") continue;
    const sheet = sheets[index];
    const templateName = sheet.title;
    await sheet.loadCells();
    const grid = sheet.gridProperties;
    const cols = grid.columnCount;
    const rows = grid.rowCount;
    const template = { name: templateName, groups: [], meta: [] };
    //console.log("SHEET", sheet);

    const published = sheet.getCell(0, 0);
    console.log("Published", sheet.title, published.value);
    if (!published || !published.value || published.value !== true) {
      continue;
    }

    const meta = sheet.getCell(1, 0);
    if (meta && meta.value) {
      const _meta = parseJSON(meta.value);
      template.meta = _meta ?? [];
    }

    //loop all columns
    for (let col = firstGroupNameCol; col < cols; col += nextGroupCell) {
      const groupName = sheet.getCell(0, col);

      if (!groupName || !groupName.value) {
        continue;
      }
      const group = { name: groupName.value, values: [] };
      for (let row = firstRow; row < rows; row++) {
        const valueName = sheet.getCell(row, col);
        if (!valueName || !valueName.value) break;
        group.values.push(valueName.value);
      }
      if (!group.values.length) continue;
      template.groups.push(group);
    }
    if (!template.groups.length) continue;
    templates.push(template);
  }

  console.log(JSON.stringify(templates));

  return templates;
};

const refresh = async() => {
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo(); // loads document properties and worksheets

  await fsPromise.writeFile(dataFile, JSON.stringify(await formatCanData(doc)), "UTF-8");
}

await refresh();
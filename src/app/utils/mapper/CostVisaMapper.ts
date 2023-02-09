import {ICostColumn} from "../../data/model/response/CostColumn";
import {editableColumn, invisibleColumn} from "../constants/ConfigurationColumnsConstants";
import {ICostVisaSaveData} from "../../data/model/request/ICostVisaSaveData";
import {ICostVisaSaveItem} from "../../data/model/request/ICostVisaSaveItem";
import {ICostItem} from "../../data/model/response/ItemCost";

export function ToSaveCostData(CostItems: ICostItem[]): ICostVisaSaveData {
    const saveDataArray: ICostVisaSaveItem[] = [];
    CostItems.map((item) =>
        <ICostVisaSaveItem> {
            Id: ite ,
            TotalSumPlan: value
        }
    )
    this.VisaCostSummarySave.forEach((value, key) => {
        saveDataArray.push({
                Id: key,
                TotalSumPlan: value
            }
        );
    });
    return {
        CostItemData: saveDataArray
    };
}

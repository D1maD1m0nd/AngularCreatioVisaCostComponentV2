import {ICostColumn} from "../../data/model/response/CostColumn";
import {editableColumn, invisibleColumn} from "../constants/ConfigurationColumnsConstants";
import {ICostVisaSaveData} from "../../data/model/request/ICostVisaSaveData";
import {ICostVisaSaveItem} from "../../data/model/request/ICostVisaSaveItem";
import {ICostItem} from "../../data/model/response/ItemCost";

export function ToSaveCostData(CostItems: ICostItem[]): ICostVisaSaveData {
    const saveDataArray: ICostVisaSaveItem[] = [];
    CostItems.map((item) =>
        <ICostVisaSaveItem> {
            Id: item.VisaId ,
            TotalSumPlan: item.TotalSumPlan,
            FirstQuarterNewSum: item.FirstQuarterNewSum,
            SecondQuarterNewSum: item.SecondQuarterNewSum,
            ThirdQuarterNewSum: item.ThirdQuarterNewSum,
            FourthQuarterNewSum: item.FourthQuarterNewSum
        }
    )
    return {
        CostItemData: saveDataArray
    };
}

import {ICostVisaSaveData} from "../../data/model/request/ICostVisaSaveData";
import {ICostVisaSaveItem} from "../../data/model/request/ICostVisaSaveItem";
import {ICostItem} from "../../data/model/response/ItemCost";

export function ToSaveCostData(CostItems: ICostItem[]): ICostVisaSaveData {
    const saveDataArray: ICostVisaSaveItem[] = CostItems
        .map((item) =>
            <ICostVisaSaveItem>{
                VisaBudgetFilialId: item.VisaBudgetFilialId,
                DetailBudgetId: item.DetailBudgetId,
                VisaId: item.VisaId,
                IsAproveBrendManager: item.IsAproveBrendManager,
                IsAproveOwnerFilial: item.IsAproveOwnerFilial,
                TotalSumPlan: item.TotalSumPlan,
                FirstQuarterNewSum: item.FirstQuarterNewSum > 0 ? item.FirstQuarterNewSum : item.FirstQuarterPlanSumBranch,
                SecondQuarterNewSum: item.SecondQuarterNewSum > 0 ? item.SecondQuarterNewSum : item.SecondQuarterPlanSumBranch,
                ThirdQuarterNewSum: item.ThirdQuarterNewSum > 0 ? item.ThirdQuarterNewSum : item.ThirdQuarterPlanSumBranch,
                FourthQuarterNewSum: item.FourthQuarterNewSum > 0 ? item.FourthQuarterNewSum : item.FourthQuarterPlanSumBranch
            }
        );
    return {
        CostItemData: saveDataArray
    };
}

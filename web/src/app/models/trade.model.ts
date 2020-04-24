export class Trade {
    public Id:string;
    public Date:Date;
    public StockSymbol:string;
    public IsPurchase:boolean;
    public Quantity?:number;
    public Price?:number;

    public CurrentQuantity?:number;
    public SaleProfitLoss?:number;

    // TODO: Computed properties aren't working in this model!
    public get SaleProfitLossCssClass():string {
        return this.SaleProfitLoss >= 0 ? "green" : "red";
    }
}
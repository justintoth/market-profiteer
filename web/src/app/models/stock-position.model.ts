export class StockPosition {
    public StockSymbol:string;
    public Quantity:number;
    public PurchasePrice:number;
    public CurrentPrice:number;

    public get Balance():number {
        return this.Quantity * this.CurrentPrice;
    }

    public get ProfitLoss():number {
        return (this.CurrentPrice - this.PurchasePrice) * this.Quantity;
    }

    public get ProfitLossCssClass():string {
        return this.ProfitLoss >= 0 ? "green" : "red";
    }
}

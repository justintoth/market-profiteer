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

    public Clone():Trade {
        let trade = new Trade();
        trade.Id = this.Id;
        trade.Date = this.Date;
        trade.StockSymbol = this.StockSymbol;
        trade.IsPurchase = this.IsPurchase;
        trade.Quantity = this.Quantity;
        trade.Price = this.Price;
        return trade;
    }
}
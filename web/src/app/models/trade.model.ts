export class Trade {
    public Date:Date;
    public StockSymbol:string;
    public IsPurchase:boolean;
    public Quantity:number;
    public Price:number;

    public CurrentQuantity:number;
    public SaleProfitLoss:number;

    public get Transaction():string {
        return this.IsPurchase ? 'purchased' : 'sold';
    }
}